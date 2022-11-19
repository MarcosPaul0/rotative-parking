import { Button } from '@components/Button';
import { MaskedInput } from '@components/MaskedInput';
import { Modal } from '@components/Modal';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';

interface CreditCardFormData {
  number: string;
  name: string;
  cvc: string;
  validity: string;
}

interface RegisterCreditCardModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetchCreditCards: () => void;
}

export function RegisterCreditCardModal({
  isOpen,
  closeModal,
  refetchCreditCards,
}: RegisterCreditCardModalProps) {
  const { errorNotify, successNotify } = useNotify();

  const { user } = useAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreditCardFormData>({
    defaultValues: {
      number: '',
      validity: '',
      cvc: '',
    },
  });

  async function registerCreditCard({
    number,
    cvc,
    validity,
  }: CreditCardFormData) {
    const expirations = validity.split('/');
    const expirationMonth = +expirations[0];
    const expirationYear = +expirations[0];

    try {
      await apiClient.post(ApiRoutes.CREDIT_CARD, {
        ownerId: user!.id,
        number: number.replace(/\s/g, ''),
        expirationMonth,
        expirationYear,
        cvc: +cvc,
      });

      successNotify({
        title: 'Cartão Registrado',
        message: 'Cartão registrado com sucesso',
      });

      reset();
      refetchCreditCards();
      closeModal();
    } catch (error) {
      errorNotify({
        title: 'Falha no Registro',
        message: 'Falha ao registrar cartão, tente novamente',
      });

      reset();
    }
  }

  const requiredRule = {
    message: Validations.REQUIRED,
    value: true,
  };

  return (
    <Modal
      text="Registre um novo cartão de crédito"
      animationType="fade"
      visible={isOpen}
    >
      <MaskedInput
        mask="9999 9999 9999 9999"
        label="Número do cartão"
        controllerProps={{
          control,
          name: 'number',
          rules: {
            required: requiredRule,
          },
        }}
        errorMessage={errors.number?.message}
      />

      <MaskedInput
        mask="999"
        label="CVC"
        controllerProps={{
          control,
          name: 'cvc',
          rules: {
            required: requiredRule,
            maxLength: {
              value: 3,
              message: Validations.CVC_LENGTH,
            },
            minLength: {
              value: 3,
              message: Validations.CVC_LENGTH,
            },
          },
        }}
        errorMessage={errors.cvc?.message}
      />

      <MaskedInput
        mask="99/99"
        label="Validade"
        controllerProps={{
          control,
          name: 'name',
          rules: {
            required: requiredRule,
            minLength: {
              value: 5,
              message: Validations.EXPIRATION_DATE,
            },
          },
        }}
        errorMessage={errors.validity?.message}
      />

      <Button
        text="Registrar Cartão"
        onPress={handleSubmit(registerCreditCard)}
        isLoading={isSubmitting}
        mt={10}
      />
      <Button
        text="Fechar"
        variant="outlined"
        bgColor="red"
        onPress={closeModal}
        mt={10}
      />
    </Modal>
  );
}
