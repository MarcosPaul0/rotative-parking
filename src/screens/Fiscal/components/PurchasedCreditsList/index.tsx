import { Text } from '@styles/defaults';
import { format } from 'date-fns';
import { Check, ClockClockwise, X } from 'phosphor-react-native';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  DateText,
  InfoContainer,
  PlateText,
  PurchasedCreditsContainer,
  Status,
  StatusContainer,
  StatusText,
} from './styles';

interface PurchasedCreditProps {
  status: 'paid' | 'pending' | 'canceled';
}

export function PurchasedCredit({ status }: PurchasedCreditProps) {
  const date = format(new Date(), 'dd/MM/yyyy hh:mm:ss');

  const { COLORS } = useContext(ThemeContext);

  const STATUS_DATA = {
    paid: {
      color: 'green',
      status: 'PAGO',
      icon: <Check size={32} color={COLORS.GREEN_500} />,
    },
    pending: {
      color: 'yellow',
      status: 'PENDENTE',
      icon: <ClockClockwise size={32} color={COLORS.YELLOW_500} />,
    },
    canceled: {
      color: 'red',
      status: 'CANCELADO',
      icon: <X size={32} color={COLORS.RED_500} />,
    },
  } as const;

  const STATUS = STATUS_DATA[status];

  return (
    <PurchasedCreditsContainer>
      <PlateText>1234-SDF</PlateText>
      <DateText>{date}</DateText>

      <StatusContainer>
        {STATUS.icon}

        <StatusText color={STATUS.color}>{STATUS.status}</StatusText>
      </StatusContainer>
    </PurchasedCreditsContainer>
  );
}
