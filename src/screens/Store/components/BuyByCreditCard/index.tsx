import { PaymentFormData } from '@screens/Store';
import { SelectContainer, SelectText } from '@screens/Store/styles';
import { formatCreditCardNumber } from '@utils/formatCreditCardNumber';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  // eslint-disable-next-line no-unused-vars
  CreditCardData,
  SelectCreditCardModal,
} from '../SelectCreditCardModal';

export function BuyByCreditCard() {
  const { watch, setValue } = useFormContext<PaymentFormData>();

  const creditCardNumberWatched = watch('cardNumber');

  const [creditCardModalIsOpen, setCreditCardModalIsOpen] = useState(false);

  function handleOpenCreditCardModal() {
    setCreditCardModalIsOpen(true);
  }

  function handleCloseCreditCardModal() {
    setCreditCardModalIsOpen(false);
  }

  function selectCreditCard({
    number,
    cvc,
    expirationMonth,
    expirationYear,
    flag,
    cardName,
  }: CreditCardData) {
    setValue('cardHolderName', cardName);
    setValue('cardNumber', number);
    setValue('securityCode', cvc);
    setValue('expirationMonth', expirationMonth);
    setValue('expirationYear', expirationYear);
    setValue('cardBrand', flag);
    setCreditCardModalIsOpen(false);
  }

  return (
    <>
      <SelectCreditCardModal
        isOpen={creditCardModalIsOpen}
        selectCreditCard={selectCreditCard}
        handleClose={handleCloseCreditCardModal}
      />

      <SelectContainer onPress={handleOpenCreditCardModal}>
        {creditCardNumberWatched ? (
          <SelectText>
            {formatCreditCardNumber(creditCardNumberWatched)}
          </SelectText>
        ) : (
          <SelectText>Selecionar um Cartão</SelectText>
        )}
      </SelectContainer>
    </>
  );
}
