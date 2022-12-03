import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskedInput';
import { NumberInput } from '@components/NumberInput';
import { Validations } from '@enums/validations.enum';
import { PaymentFormData } from '@screens/Store';
import {
    RegionData,
    SelectRegionModal
} from '@screens/Store/components/SelectRegionModal';
import { SwitchSaleType } from '@screens/Store/components/SwitchSaleType';
import {
    LeftText,
    LineContainer,
    RightText,
    SelectContainer,
    SelectText
} from '@screens/Store/styles';
import { ScrollScreenContainer, Text } from '@styles/defaults';
import { formatPrice } from '@utils/formatPrice';
import { addHours, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface PaymentFormWithCardAndCpfData extends PaymentFormData {
  cardName: string;
  cardValidity: string;
  cardCvc: string;
  cpf: string;
}

export function OutStoreScreen() {
  const [selectRegionModalIsOpen, setSelectRegionModalIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);

  const formMethods = useForm<PaymentFormWithCardAndCpfData>({
    defaultValues: {
      credits: 1,
      vehiclePlate: '',
      type: 'creditCard',
      cpf: '',
      cardNumber: '',
      cardHolderName: '',
      securityCode: 0,
      expirationMonth: 0,
      expirationYear: 0,
      cardBrand: '',
      description: '',
      region: 0,
      cardName: '',
      cardValidity: '',
      cardCvc: '',
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
    // const {
    //   credits,
    //   vehiclePlate,
    //   type,
    //   cardNumber,
    //   cardHolderName,
    //   securityCode,
    //   expirationMonth,
    //   expirationYear,
    //   cardBrand,
    //   description,
    //   region,
    //   cardName,
    //   cardValidity,
    //   cardCvc,
    // }: PaymentFormWithCardData = getValues();
    // try {
    //   const pixPaymentData = {
    //     method: type,
    //     name: user?.name,
    //     cpf: user?.cpf,
    //     email: user?.email,
    //     license_plate: vehiclePlate,
    //     credits,
    //     description,
    //     region,
    //   };
    //   const creditCardPaymentData = {
    //     // ...pixPaymentData,
    //     card_info: {
    //       card_number: cardNumber?.replace(/\s/g, ''),
    //       card_holder_cpf: user?.cpf,
    //       securityCode,
    //       expiration_month: expirationMonth,
    //       expiration_year: expirationYear,
    //       card_brand: cardBrand,
    //       card_holder_name: cardHolderName,
    //     },
    //     installments: 1,
    //   };
    //   const response = await apiClient.post(
    //     ApiRoutes.PAYMENTS,
    //     type === 'creditCard' ? creditCardPaymentData : pixPaymentData
    //   );
    //   console.log(response.data);
    //   reset();
    //   successNotify({
    //     title: 'Compra registrada',
    //     message: 'A compra foi registrada como pendente',
    //   });
    // } catch (error) {
    //   console.log(error.response.data);
    //   reset();
    //   errorNotify({
    //     title: 'Error na compra de créditos',
    //     message: 'Error ao registrar compra, tente novamente',
    //   });
    // }
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
            label="Email ou CPF"
            errorMessage={errors.cpf?.message}
            controllerProps={{
              control,
              name: 'cpf',
              rules: {
                required: { message: Validations.REQUIRED, value: true },
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
                label="Nome no cartão"
                mask="9999 9999 9999 9999"
                controllerProps={{
                  control,
                  name: 'cardName',
                  rules: {
                    required: requiredRule,
                  },
                }}
                errorMessage={errors.cardName?.message}
              />

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
                errorMessage={errors.cardCvc?.message}
              />

              <MaskedInput
                mask="99/99"
                label="Validade"
                controllerProps={{
                  control,
                  name: 'validity',
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

          {typeWatched === 'pix' && <Text>QR Code Gerado</Text>}
          {/* 
          <SelectVehicleModal
            isOpen={vehicleModalIsOpen}
            selectVehiclePlate={selectVehiclePlate}
            handleClose={handleCloseVehicleModal}
          />

          <SelectContainer onPress={handleOpenVehicleModal}>
            {vehiclePlateWatched ? (
              <SelectText>{vehiclePlateWatched}</SelectText>
            ) : (
              <SelectText>Selecionar um Veículo</SelectText>
            )}
          </SelectContainer>

          <Input
            inputProps={{
              placeholder: 'Descrição...',
            }}
            controllerProps={{
              control,
              name: 'description',
              rules: {
                required: {
                  value: true,
                  message: Validations.REQUIRED,
                },
              },
            }}
            errorMessage={errors.description?.message}
          />
        */}

          <Button
            text="Finalizar Compra"
            onPress={registerPayment}
            mt={10}
            isLoading={isSubmitting}
          />
        </Card>
      </ScrollScreenContainer>
    </FormProvider>
  );
}
