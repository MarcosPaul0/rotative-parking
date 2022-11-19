import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { NumberInput } from '@components/NumberInput';
import { ScreenContainer } from '@styles/defaults';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, addHours } from 'date-fns';
import { formatCreditCardNumber } from '@utils/formatCreditCardNumber';
import {
  // eslint-disable-next-line no-unused-vars
  CreditCardData,
  SelectCreditCardModal,
} from './components/SelectCreditCardModal';
import { SwitchSaleType } from './components/SwitchSaleType';
import {
  LeftText,
  LineContainer,
  RightText,
  SelectContainer,
  SelectText,
} from './styles';
import {
  SelectVehicleModal,
  // eslint-disable-next-line no-unused-vars
  VehicleData,
} from './components/SelectVehicleModal';

export interface BuyCreditsData {
  credits: number;
  vehiclePlate: string;
  type: 'creditCard' | 'pix';
  cardNumber?: string;
  securityCode?: number;
  expirationMonth?: number;
  expirationYear?: number;
  cardBrand?: string;
}

export function StoreScreen() {
  const { setValue, getValues, watch } = useForm<BuyCreditsData>({
    defaultValues: {
      credits: 1,
      vehiclePlate: '',
      type: 'creditCard',
      cardNumber: '',
      securityCode: 0,
      expirationMonth: 0,
      expirationYear: 0,
      cardBrand: '',
    },
  });

  const typeWatched = watch('type');
  const creditsWatched = watch('credits');
  const creditCardNumberWatched = watch('cardNumber');
  const vehiclePlateWatched = watch('vehiclePlate');

  const creditsTotal = (creditsWatched * 7.5).toFixed(2).replace('.', ',');
  const finalDate = format(
    addHours(new Date(), creditsWatched),
    'dd/MM/yy hh:mm:ss'
  );

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

  const [creditCardModalIsOpen, setCreditCardModalIsOpen] = useState(false);

  function handleOpenCreditCardModal() {
    setCreditCardModalIsOpen(true);
  }

  function selectCreditCard({
    number,
    cvc,
    expirationMonth,
    expirationYear,
    flag,
  }: CreditCardData) {
    setValue('cardNumber', number);
    setValue('securityCode', cvc);
    setValue('expirationMonth', expirationMonth);
    setValue('expirationYear', expirationYear);
    setValue('cardBrand', flag);
    setCreditCardModalIsOpen(false);
  }

  const [vehicleModalIsOpen, setVehicleModalIsOpen] = useState(false);

  function handleOpenVehicleModal() {
    setVehicleModalIsOpen(true);
  }

  function selectVehiclePlate({ plate }: VehicleData) {
    setValue('vehiclePlate', plate);
    setVehicleModalIsOpen(false);
  }

  return (
    <ScreenContainer>
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
          <RightText>R$ {creditsTotal}</RightText>
        </LineContainer>

        {typeWatched === 'creditCard' ? (
          <>
            <SelectCreditCardModal
              isOpen={creditCardModalIsOpen}
              selectCreditCard={selectCreditCard}
            />

            <SelectContainer onPress={handleOpenCreditCardModal}>
              {creditCardNumberWatched ? (
                <SelectText>
                  {formatCreditCardNumber(creditCardNumberWatched)}
                </SelectText>
              ) : (
                <SelectText>Selecionar Cartão</SelectText>
              )}
            </SelectContainer>

            <SelectVehicleModal
              isOpen={vehicleModalIsOpen}
              selectVehiclePlate={selectVehiclePlate}
            />

            <SelectContainer onPress={handleOpenVehicleModal}>
              {vehiclePlateWatched ? (
                <SelectText>{vehiclePlateWatched}</SelectText>
              ) : (
                <SelectText>Selecionar Veículo</SelectText>
              )}
            </SelectContainer>
          </>
        ) : null}

        <Button text="Confirmar Compra" onPress={() => null} mt={10} />
      </Card>
    </ScreenContainer>
  );
}
