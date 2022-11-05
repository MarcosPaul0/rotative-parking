import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface RegisterCarModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

interface RegisterCarData {
  name: string;
  plate: string;
}

export function RegisterCarModal({
  isOpen,
  onCloseModal,
}: RegisterCarModalProps) {
  const { successNotify, errorNotify } = useNotify();

  const { control, handleSubmit } = useForm<RegisterCarData>({
    defaultValues: {
      name: '',
      plate: '',
    },
  });

  async function registerCar({ name, plate }: RegisterCarData) {
    try {
      await apiClient.post(ApiRoutes.CARS, {
        name,
        plate,
      });

      successNotify({
        title: 'Carro registrado',
        message: 'O carro foi registrado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao registrar o carro',
        message: 'Ocorreu um erro ao registrar o carro, tente novamente',
      });
    }
  }

  return (
    <Modal visible={isOpen} text="Registre um Carro" textType="title">
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
