import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskedInput';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { VehicleData } from '@screens/Vehicles';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface UpdateVehicleModalProps {
  vehicle: VehicleData;
  isOpen: boolean;
  closeModal: () => void;
  refetchVehicles: () => void;
}

export function UpdateVehicleModal({
  vehicle,
  isOpen,
  closeModal,
  refetchVehicles,
}: UpdateVehicleModalProps) {
  const { errorNotify, successNotify } = useNotify();

  const { control, handleSubmit } = useForm<VehicleData>({
    defaultValues: {
      id: vehicle.id,
      name: vehicle.name,
      license_plate: vehicle.license_plate,
    },
  });

  async function updateVehicle({ id, name, license_plate }: VehicleData) {
    try {
      await apiClient.patch(`${ApiRoutes.VEHICLE}/${id}`, {
        name,
        license_plate,
      });

      refetchVehicles();
      successNotify({
        title: 'Veículo atualizado',
        message: 'O veículo foi atualizado com sucesso',
      });
      closeModal();
    } catch {
      errorNotify({
        title: 'Erro ao atualizar o veículo',
        message: 'Ocorreu um erro ao atualizar o veículo, tente novamente',
      });
    }
  }

  return (
    <Modal visible={isOpen} text="Atualize os dados do veículo">
      <Input
        label="Nome"
        controllerProps={{
          control,
          name: 'name',
        }}
      />
      <MaskedInput
        mask="AAA-9999"
        label="Placa"
        controllerProps={{
          control,
          name: 'license_plate',
        }}
      />

      <Button text="Atualizar" onPress={handleSubmit(updateVehicle)} />
      <Button
        text="Cancelar"
        variant="outlined"
        bgColor="red"
        onPress={closeModal}
        mt={10}
      />
    </Modal>
  );
}
