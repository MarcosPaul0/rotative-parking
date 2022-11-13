import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { NumberInput } from '@components/NumberInput';
import { ScreenContainer } from '@styles/defaults';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCardModal } from './components/CreditCardModal';
import { SwitchSaleType } from './components/SwitchSaleType';

export interface BuyCreditsData {
  credits: number;
  type: 'creditCard' | 'pix';
  creditCardId?: string;
}

export function StoreScreen() {
  const [creditCardModalIsOpen, setCreditCardModalIsOpen] = useState(false);

  const { setValue, getValues, watch } = useForm<BuyCreditsData>({
    defaultValues: {
      credits: 1,
      type: 'creditCard',
      creditCardId: '',
    },
  });

  const typeWatched = watch('type');
  const creditsWatched = watch('credits');

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

  function selectCreditCard(creditCardId: string) {
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
        <NumberInput
          number={creditsWatched}
          add={addCredit}
          remove={removeCredit}
        />

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
