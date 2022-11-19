import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { NumberInput } from '@components/NumberInput';
import { ScreenContainer } from '@styles/defaults';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, addHours } from 'date-fns';
import { CreditCardModal } from './components/CreditCardModal';
import { SwitchSaleType } from './components/SwitchSaleType';
import { LeftText, LineContainer, RightText } from './styles';

export interface BuyCreditsData {
  credits: number;
  type: 'creditCard' | 'pix';
  creditCardId?: number;
}

export function StoreScreen() {
  const [creditCardModalIsOpen, setCreditCardModalIsOpen] = useState(false);

  const { setValue, getValues, watch } = useForm<BuyCreditsData>({
    defaultValues: {
      credits: 1,
      type: 'creditCard',
      creditCardId: undefined,
    },
  });

  const typeWatched = watch('type');
  const creditsWatched = watch('credits');

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

  function handleOpenCreditCardModal() {
    setCreditCardModalIsOpen(true);
  }

  function selectCreditCard(creditCardId: number) {
    setValue('creditCardId', creditCardId);
    setCreditCardModalIsOpen(false);
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
            <CreditCardModal
              isOpen={creditCardModalIsOpen}
              selectCreditCard={selectCreditCard}
            />
            <Button
              text="Selecionar Cartão"
              onPress={handleOpenCreditCardModal}
              mt={10}
            />
          </>
        ) : null}

        <Button text="Confirmar Compra" onPress={() => null} mt={10} />
      </Card>
    </ScreenContainer>
  );
}
