import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { SubTitle, TextContainer, Title } from './styles';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  const { GRADIENTS } = useContext(ThemeContext);

  const [leftColor, rightColor] = GRADIENTS.CARD;

  return (
    <LinearGradient
      colors={[leftColor, rightColor]}
      style={{
        borderRadius: 10,
        padding: 18,
        paddingBottom: 30,
      }}
    >
      <TextContainer>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </TextContainer>
      {children}
    </LinearGradient>
  );
}
