import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { VehicleData } from '@screens/Vehicles';
import { useForm } from 'react-hook-form';

interface UpdateVehicleModalProps {
  vehicle: VehicleData;
  onUpdateVehicle: (vehicle: VehicleData) => void;
  isOpen: boolean;
  onCloseModal: () => void;
}

export function UpdateVehicleModal({
  vehicle,
  isOpen,
  onUpdateVehicle,
  onCloseModal,
}: UpdateVehicleModalProps) {
  const { control, handleSubmit } = useForm<VehicleData>({
    defaultValues: {
      id: vehicle.id,
      name: vehicle.name,
      plate: vehicle.plate,
    },
  });

  return (
    <Modal visible={isOpen} text="Atualize os dados do veículo">
      <Input
        label="Nome"
        controllerProps={{
          control,
          name: 'name',
        }}
      />
      <Input
        label="Placa"
        controllerProps={{
          control,
          name: 'plate',
        }}
      />

      <Button text="Atualizar" onPress={handleSubmit(onUpdateVehicle)} />
      <Button
        text="Cancelar"
        variant="outlined"
        bgColor="red"
        onPress={onCloseModal}
        mt={10}
      />
    </Modal>
  );
}
