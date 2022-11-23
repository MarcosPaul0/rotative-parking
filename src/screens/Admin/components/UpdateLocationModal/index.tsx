import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Patterns } from '@enums/patterns.enum';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import { Location } from '@screens/Admin';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface UpdateLocationData {
  region: string;
  price: string;
  parking_lots: string;
}

interface UpdateLocationModalProps {
  isOpen: boolean;
  location: Location;
  handleClose: () => void;
  refetchRegions: () => void;
}

export function UpdateLocationModal({
  isOpen,
  location,
  handleClose,
  refetchRegions,
}: UpdateLocationModalProps) {
  const { successNotify, errorNotify } = useNotify();

  const {
    control: updateLocationControl,
    handleSubmit: handleSubmitUpdateLocation,
    reset: updateLocationReset,
    formState: {
      isSubmitting: updateLocationIsSubmitting,
      errors: updateLocationErrors,
    },
  } = useForm<UpdateLocationData>({
    defaultValues: {
      region: location.region,
      price: String(location.price),
      parking_lots: String(location.parking_lots),
    },
  });

  async function updateLocation({
    parking_lots,
    region,
    price,
  }: UpdateLocationData) {
    try {
      await apiClient.patch(`${ApiRoutes.REGIONS}/${location.id}`, {
        region,
        price: +price.replace(',', '.'),
        parking_lots: +parking_lots,
      });

      successNotify({
        title: 'Região Atualizada',
        message: 'Os dados da região foram atualizados com sucesso!',
      });
      updateLocationReset();
      refetchRegions();
      handleClose();
    } catch (error) {
      errorNotify({
        title: 'Erro ao Atualizar',
        message: 'Erro ao atualizar a região, tente novamente!',
      });
    }
  }

  const requiredValidation = {
    message: Validations.REQUIRED,
    value: true,
  };

  return (
    <Modal
      text="Preencha os campos para cadastrar uma nova região de zona azul"
      visible={isOpen}
    >
      <Input
        label="Região"
        controllerProps={{
          control: updateLocationControl,
          name: 'region',
          rules: {
            required: requiredValidation,
          },
        }}
        errorMessage={updateLocationErrors.region?.message}
      />

      <Input
        label="Preço"
        controllerProps={{
          control: updateLocationControl,
          name: 'price',
          rules: {
            required: requiredValidation,
            pattern: {
              message: Validations.INVALID_VALUE,
              value: Patterns.FLOAT,
            },
          },
        }}
        errorMessage={updateLocationErrors.price?.message}
      />

      <Input
        label="Vagas"
        controllerProps={{
          control: updateLocationControl,
          name: 'parking_lots',
          rules: {
            required: requiredValidation,
            pattern: {
              message: Validations.INVALID_VALUE,
              value: Patterns.INT,
            },
          },
        }}
        errorMessage={updateLocationErrors.parking_lots?.message}
      />

      <Button
        text="Atualizar Região"
        onPress={handleSubmitUpdateLocation(updateLocation)}
        isLoading={updateLocationIsSubmitting}
      />
      <Button
        text="Cancelar"
        variant="outlined"
        bgColor="red"
        onPress={handleClose}
        mt={10}
      />
    </Modal>
  );
}
