import { ReactNode } from 'react';
import { CardContainer, SubTitle, TextContainer, Title } from './styles';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <CardContainer>
      <TextContainer>
        {title && <Title>{title}</Title>}
        <SubTitle>{subtitle}</SubTitle>
      </TextContainer>
      {children}
    </CardContainer>
  );
}
