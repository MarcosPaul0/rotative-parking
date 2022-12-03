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
import { SwitchSaleType } from '@screens/Store/components/SwitchSaleType';
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
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AppRoutes } from '@enums/appRoutes.enum';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { SelectContainer } from './styles';

export interface PaymentFormWithCardAndCpfData {
  credits: number;
  vehiclePlate: string;
  type: 'creditCard' | 'pix';
  cardNumber?: string;
  expirationMonth?: number;
  expirationYear?: number;
  cardBrand?: string;
  description: string;
  cardHolderName?: string;
  region: number;
  name: string;
  cardValidity: string;
  cvc: string;
  cpf: string;
  email: string;
}

export function OutStoreScreen() {
  const { successNotify, errorNotify } = useNotify();

  const { navigate } = useNavigation();

  const [selectRegionModalIsOpen, setSelectRegionModalIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);

  const formMethods = useForm<PaymentFormWithCardAndCpfData>({
    defaultValues: {
      credits: 1,
      vehiclePlate: '',
      type: 'creditCard',
      name: '',
      cpf: '',
      email: '',
      cardNumber: '',
      cardHolderName: '',
      cardBrand: '',
      description: '',
      region: 0,
      cardValidity: '',
      cvc: '',
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

  const typeWatched = watch('type');
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
      type,
      cardNumber,
      cardHolderName,
      cardBrand,
      description,
      region,
      name,
      cardValidity,
      cvc,
      email,
      cpf,
    }: PaymentFormWithCardAndCpfData = getValues();
    try {
      const pixPaymentData = {
        method: type,
        name,
        cpf,
        email,
        license_plate: vehiclePlate,
        credits,
        description,
        region,
      };

      const creditCardPaymentData = {
        ...pixPaymentData,
        card_info: {
          card_number: cardNumber?.replace(/\s/g, ''),
          card_holder_cpf: cpf,
          securityCode: cvc,
          expiration_month: +cardValidity.split('/')[0],
          expiration_year: +cardValidity.split('/')[1],
          card_brand: cardBrand,
          card_holder_name: cardHolderName,
        },
        installments: 1,
      };

      const response = await apiClient.post(
        ApiRoutes.PAYMENTS,
        type === 'creditCard' ? creditCardPaymentData : pixPaymentData
      );
      reset();
      successNotify({
        title: 'Compra registrada',
        message: 'A compra foi registrada como pendente',
      });

      if (type === 'creditCard') {
        navigate(AppRoutes.SUCCESS_CARD_SALE, {
          validate: finalDate,
        });
      } else {
        navigate(AppRoutes.SUCCESS_PIX_SALE, {
          ticketUrl: response.data.aditional_data.mp_ticket_url,
          tokenQrCode: response.data.aditional_data.pix_qr_code,
          validate: finalDate,
        });
      }
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
          <SwitchSaleType setValue={setValue} type={typeWatched} />

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
            label="Nome no cartão"
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

          {typeWatched === 'creditCard' ? (
            <>
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
                errorMessage={errors.cardNumber?.message}
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
                  name: 'cardValidity',
                  rules: {
                    required: requiredRule,
                    minLength: {
                      value: 5,
                      message: Validations.EXPIRATION_DATE,
                    },
                  },
                }}
                errorMessage={errors.cardValidity?.message}
              />
            </>
          ) : null}

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
