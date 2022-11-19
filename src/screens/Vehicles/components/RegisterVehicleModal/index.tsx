import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskedInput';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import { VehicleData } from '@screens/Vehicles';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface RegisterVehicleModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface RegisterVehicleData {
  name: string;
  plate: string;
}

export function RegisterVehicleModal({
  isOpen,
  closeModal,
}: RegisterVehicleModalProps) {
  const { successNotify, errorNotify } = useNotify();

  const { control, handleSubmit, reset } = useForm<RegisterVehicleData>({
    defaultValues: {
      name: '',
      plate: '',
    },
  });

  async function registerVehicle({ name, plate }: RegisterVehicleData) {
    try {
      await apiClient.post<VehicleData>(ApiRoutes.VEHICLE, {
        name,
        plate,
      });

      successNotify({
        title: 'Veículo registrado',
        message: 'O veículo foi registrado com sucesso',
      });

      reset();
      closeModal();
    } catch {
      reset();

      errorNotify({
        title: 'Erro ao registrar o veículo',
        message: 'Ocorreu um erro ao registrar o veículo, tente novamente',
      });
    }
  }

  const requiredValidation = {
    value: true,
    message: Validations.REQUIRED,
  };

  return (
    <Modal visible={isOpen} text="Registre um Veículo" textType="title">
      <Input
        label="Nome"
        controllerProps={{
          control,
          name: 'name',
          rules: {
            required: requiredValidation,
          },
        }}
      />
      <MaskedInput
        mask="AAA-9999"
        label="Placa"
        controllerProps={{
          control,
          name: 'plate',
          rules: {
            required: requiredValidation,
          },
        }}
      />

      <Button text="Registrar" onPress={handleSubmit(registerVehicle)} />
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
