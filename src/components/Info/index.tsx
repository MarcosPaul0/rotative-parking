import { InfoContainer, InfoLabel, InfoValue } from './styles';

interface InfoProps {
  label: string;
  value: string | number;
  color?: 'green' | 'blue' | 'yellow' | 'red';
}

export function Info({ label, value, color = 'green' }: InfoProps) {
  return (
    <InfoContainer>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue color={color}>{value}</InfoValue>
    </InfoContainer>
  );
}
