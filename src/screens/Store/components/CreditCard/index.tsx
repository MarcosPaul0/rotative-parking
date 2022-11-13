import { formatCreditCardNumber } from '@utils/formatCreditCardNumber';
import { format } from 'date-fns';
import {
  CreditCardContainer,
  CreditCardNumber,
  LineContainer,
  Value,
  Label,
  ContentContainer,
  OwnerText,
} from './styles';

interface CreditCardProps {
  owner: string;
  number: string;
  dueDate: string;
  cvc: string;
  onSelectCard: () => void;
}

export function CreditCard({
  owner,
  number,
  dueDate,
  cvc,
  onSelectCard,
}: CreditCardProps) {
  return (
    <CreditCardContainer onPress={onSelectCard}>
      <OwnerText>{owner}</OwnerText>

      <CreditCardNumber>{formatCreditCardNumber(number)}</CreditCardNumber>

      <LineContainer>
        <ContentContainer>
          <Label>CVC</Label>
          <Value>{cvc}</Value>
        </ContentContainer>
        <ContentContainer>
          <Label>Validade</Label>
          <Value>{format(new Date(dueDate), 'MM/yy')}</Value>
        </ContentContainer>
      </LineContainer>
    </CreditCardContainer>
  );
}
