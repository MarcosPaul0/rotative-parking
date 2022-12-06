import { CreditCard } from 'phosphor-react-native';
import { useContext } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ThemeContext } from 'styled-components/native';
import { Pix } from '@icons/Pix';
import {
  SwitchSalesTypeContainer,
  TextContainer,
  TypeButton,
  TypeButtonText,
} from './styles';

interface SwitchSaleTypeProps {
  setValue: UseFormSetValue<any>;
  type: 'credit_card' | 'pix';
}

export function SwitchSaleType({ type, setValue }: SwitchSaleTypeProps) {
  const { COLORS } = useContext(ThemeContext);

  return (
    <SwitchSalesTypeContainer>
      <TypeButton
        isActive={type === 'credit_card'}
        onPress={() => setValue('type', 'credit_card')}
        spacing={2}
      >
        <CreditCard
          size={54}
          color={type === 'credit_card' ? COLORS.GRAY_100 : COLORS.GREEN_500}
        />

        <TextContainer>
          <TypeButtonText isActive={type === 'credit_card'}>
            Cartão de Crédito
          </TypeButtonText>
        </TextContainer>
      </TypeButton>

      <TypeButton
        isActive={type === 'pix'}
        onPress={() => setValue('type', 'pix')}
        ml={20}
        spacing={1}
      >
        <Pix color={type === 'pix' ? COLORS.GRAY_100 : COLORS.GREEN_500} />

        <TextContainer>
          <TypeButtonText isActive={type === 'pix'}>PIX</TypeButtonText>
        </TextContainer>
      </TypeButton>
    </SwitchSalesTypeContainer>
  );
}
