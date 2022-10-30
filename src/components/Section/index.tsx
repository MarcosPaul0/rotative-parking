import { SubTitle, TextContainer, Title } from './styles';

interface SectionProps {
  title?: string;
  subtitle?: string;
}

export function Section({ title, subtitle }: SectionProps) {
  return (
    <TextContainer>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TextContainer>
  );
}
