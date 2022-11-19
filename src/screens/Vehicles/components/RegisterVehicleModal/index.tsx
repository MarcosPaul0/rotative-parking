import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface RegisterVehicleModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

interface RegisterVehicleData {
  name: string;
  plate: string;
}

export function RegisterVehicleModal({
  isOpen,
  onCloseModal,
}: RegisterVehicleModalProps) {
  const { successNotify, errorNotify } = useNotify();

  const { control, handleSubmit } = useForm<RegisterVehicleData>({
    defaultValues: {
      name: '',
      plate: '',
    },
  });

  async function registerCar({ name, plate }: RegisterVehicleData) {
    try {
      await apiClient.post(ApiRoutes.VEHICLE, {
        name,
        plate,
      });

      successNotify({
        title: 'Veículo registrado',
        message: 'O veículo foi registrado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao registrar o veículo',
        message: 'Ocorreu um erro ao registrar o veículo, tente novamente',
      });
    }
  }

  return (
    <Modal visible={isOpen} text="Registre um Veículo" textType="title">
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

      <Button text="Registrar" onPress={handleSubmit(registerCar)} />
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
