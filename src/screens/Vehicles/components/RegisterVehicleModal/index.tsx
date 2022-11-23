import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskedInput';
import { Modal } from '@components/Modal';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import { VehicleData } from '@screens/Vehicles';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface RegisterVehicleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetchVehicles: () => void;
}

interface RegisterVehicleData {
  name: string;
  license_plate: string;
}

export function RegisterVehicleModal({
  isOpen,
  closeModal,
  refetchVehicles,
}: RegisterVehicleModalProps) {
  const { user } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterVehicleData>({
    defaultValues: {
      name: '',
      license_plate: '',
    },
  });

  async function registerVehicle({ name, license_plate }: RegisterVehicleData) {
    try {
      await apiClient.post<VehicleData>(ApiRoutes.VEHICLE, {
        owner_id: user!.id,
        name,
        license_plate: license_plate.replace('-', ''),
      });

      reset();
      refetchVehicles();
      closeModal();
      successNotify({
        title: 'Veículo registrado',
        message: 'O veículo foi registrado com sucesso',
      });
    } catch (error) {
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
        errorMessage={errors.name?.message}
      />
      <MaskedInput
        mask="AAA-9999"
        label="Placa"
        controllerProps={{
          control,
          name: 'license_plate',
          rules: {
            required: requiredValidation,
          },
        }}
        errorMessage={errors.license_plate?.message}
      />

      <Button
        text="Registrar"
        isLoading={isSubmitting}
        onPress={handleSubmit(registerVehicle)}
      />
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
