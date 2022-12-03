import { format } from 'date-fns';
import { Check, ClockClockwise, X } from 'phosphor-react-native';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  DateText,
  PlateText,
  CreditsOrderContainer,
  StatusContainer,
  StatusText,
} from './styles';

interface PurchasedCreditProps {
  plate: string;
  status: 'approved' | 'pending' | 'canceled';
  createdAt: string;
}

export function CreditOrder({
  status,
  plate,
  createdAt,
}: PurchasedCreditProps) {
  const date = format(new Date(createdAt), 'dd/MM/yyyy hh:mm:ss');

  const { COLORS } = useContext(ThemeContext);

  const STATUS_DATA = {
    approved: {
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
    <CreditsOrderContainer>
      <PlateText>{plate}</PlateText>
      <DateText>{date}</DateText>

      <StatusContainer>
        {STATUS.icon}

        <StatusText color={STATUS.color}>{STATUS.status}</StatusText>
      </StatusContainer>
    </CreditsOrderContainer>
  );
}
