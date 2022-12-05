import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskedInput';
import { NumberInput } from '@components/NumberInput';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import {
  RegionData,
  SelectRegionModal,
} from '@screens/Store/components/SelectRegionModal';
import {
  LeftText,
  LineContainer,
  RightText,
  SelectText,
} from '@screens/Store/styles';
import { ScrollScreenContainer } from '@styles/defaults';
import { formatPrice } from '@utils/formatPrice';
import { addHours, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { useAuthContext } from '@contexts/AuthContext';
import { SelectContainer } from './styles';

export interface FiscalPaymentFormData {
  credits: number;
  vehiclePlate: string;
  region: number;
  description: string;
  name: string;
  cpf: string;
  email: string;
}

export function FiscalStoreScreen() {
  const { successNotify, errorNotify } = useNotify();

  const { user } = useAuthContext();

  const [selectRegionModalIsOpen, setSelectRegionModalIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);

  const formMethods = useForm<FiscalPaymentFormData>({
    defaultValues: {
      credits: 1,
      vehiclePlate: '',
      name: '',
      cpf: '',
      email: '',
      description: '',
      region: 0,
    },
  });

  const {
    control,
    setValue,
    watch,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const creditsWatched = watch('credits');
  const regionWatched = watch('region');

  function addCredit() {
    const currentCredit = getValues('credits');

    setValue('credits', currentCredit + 1);
  }

  function removeCredit() {
    const currentCredit = getValues('credits');

    if (currentCredit <= 1) {
      return;
    }

    setValue('credits', currentCredit - 1);
  }

  const finalDate = format(
    addHours(new Date(), creditsWatched),
    'dd/MM/yy hh:mm:ss',
    {
      locale: ptBR,
    }
  );

  function selectRegion(region: RegionData) {
    setValue('region', region.id);
    setActiveRegion(region);
    setSelectRegionModalIsOpen(false);
  }

  function handleCloseRegionModal() {
    setSelectRegionModalIsOpen(false);
  }

  function handleOpenRegionModal() {
    setSelectRegionModalIsOpen(true);
  }

  const requiredRule = {
    message: Validations.REQUIRED,
    value: true,
  };

  async function registerPayment() {
    const {
      credits,
      vehiclePlate,
      description,
      email,
      cpf,
      name,
      region,
    }: FiscalPaymentFormData = getValues();
    try {
      const paymentData = {
        name,
        cpf,
        email,
        region,
        license_plate: vehiclePlate,
        credits,
        method: 'presential',
        description,
        buyer_id: user!.id,
        status: 'approved',
      };

      await apiClient.post(ApiRoutes.PAYMENTS, paymentData);

      reset();
      successNotify({
        title: 'Compra registrada',
        message: 'A compra foi registrada como pendente',
      });
    } catch {
      reset();
      errorNotify({
        title: 'Error na compra de créditos',
        message: 'Error ao registrar compra, tente novamente',
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <ScrollScreenContainer>
        <Card
          title="Comprar Créditos"
          subtitle="Compre créditos de estacionamento"
        >
          <LineContainer>
            <LeftText>Quantidade de Créditos</LeftText>

            <NumberInput
              number={creditsWatched}
              add={addCredit}
              remove={removeCredit}
            />
          </LineContainer>

          <LineContainer>
            <LeftText>Validade</LeftText>
            <RightText>{finalDate}</RightText>
          </LineContainer>

          <LineContainer>
            <LeftText>Total</LeftText>
            <RightText>
              {activeRegion
                ? formatPrice(creditsWatched * activeRegion.price)
                : 'Selecione uma região'}
            </RightText>
          </LineContainer>

          <SelectRegionModal
            isOpen={selectRegionModalIsOpen}
            selectRegion={selectRegion}
            handleClose={handleCloseRegionModal}
          />

          <SelectContainer onPress={handleOpenRegionModal}>
            {regionWatched ? (
              <SelectText>{activeRegion!.region}</SelectText>
            ) : (
              <SelectText>Selecionar uma Região</SelectText>
            )}
          </SelectContainer>

          <Input
            label="Nome"
            controllerProps={{
              control,
              name: 'name',
              rules: {
                required: requiredRule,
              },
            }}
            errorMessage={errors.name?.message}
          />

          <Input
            label="Email"
            controllerProps={{
              control,
              name: 'email',
              rules: {
                required: requiredRule,
              },
            }}
            errorMessage={errors.email?.message}
          />

          <MaskedInput
            label="CPF"
            mask="999.999.999-99"
            errorMessage={errors.cpf?.message}
            controllerProps={{
              control,
              name: 'cpf',
              rules: {
                required: requiredRule,
              },
            }}
          />

          <MaskedInput
            label="Placa do Veículo"
            mask="AAA-9999"
            controllerProps={{
              control,
              name: 'vehiclePlate',
              rules: {
                required: requiredRule,
              },
            }}
            errorMessage={errors.vehiclePlate?.message}
          />

          <Input
            label="Descrição"
            controllerProps={{
              control,
              name: 'description',
              rules: {
                required: requiredRule,
              },
            }}
            errorMessage={errors.description?.message}
          />

          <Button
            text="Finalizar Compra"
            onPress={handleSubmit(registerPayment)}
            mt={10}
            isLoading={isSubmitting}
          />
        </Card>
      </ScrollScreenContainer>

      <Toast />
    </FormProvider>
  );
}
