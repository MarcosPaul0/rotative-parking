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
  const { COLORS } = useContext(ThemeContext);

  return (
    <LinearGradient
      colors={[COLORS.GRAY_700, COLORS.GRAY_800]}
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
