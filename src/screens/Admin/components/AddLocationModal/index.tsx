import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Patterns } from '@enums/patterns.enum';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import { RegisterLocationData } from '@screens/Admin';
import { apiClient } from '@services/apiClient';
import { useFormContext } from 'react-hook-form';

interface AddLocationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  refetchRegions: () => void;
}

export function AddLocationModal({
  isOpen,
  handleClose,
  refetchRegions,
}: AddLocationModalProps) {
  const { successNotify, errorNotify } = useNotify();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useFormContext<RegisterLocationData>();

  async function registerLocation({
    latitude,
    longitude,
    name,
    price,
    vacancies,
  }: RegisterLocationData) {
    if (!latitude || !longitude) {
      reset();
      handleClose();

      errorNotify({
        title: 'Erro no Registro',
        message: 'Seleciona uma nova localização primeiro!',
      });

      return;
    }

    try {
      await apiClient.post(ApiRoutes.REGIONS, {
        latitude,
        longitude,
        region: name,
        price: +price.replace(',', '.'),
        parking_lots: +vacancies,
      });

      successNotify({
        title: 'Região Cadastrada',
        message: 'Nova região registrada com sucesso!',
      });
      reset();
      refetchRegions();
      handleClose();
    } catch (error) {
      errorNotify({
        title: 'Erro no Cadastro',
        message: 'Erro ao registrar nova região, tente novamente!',
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
          control,
          name: 'name',
          rules: {
            required: requiredValidation,
          },
        }}
        errorMessage={errors.name?.message}
      />

      <Input
        label="Preço"
        controllerProps={{
          control,
          name: 'price',
          rules: {
            required: requiredValidation,
            pattern: {
              message: Validations.INVALID_VALUE,
              value: Patterns.FLOAT,
            },
          },
        }}
        errorMessage={errors.price?.message}
      />

      <Input
        label="Vagas"
        controllerProps={{
          control,
          name: 'vacancies',
          rules: {
            required: requiredValidation,
            pattern: {
              message: Validations.INVALID_VALUE,
              value: Patterns.INT,
            },
          },
        }}
        errorMessage={errors.vacancies?.message}
      />

      <Button
        text="Adicionar Região"
        onPress={handleSubmit(registerLocation)}
        isLoading={isSubmitting}
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
