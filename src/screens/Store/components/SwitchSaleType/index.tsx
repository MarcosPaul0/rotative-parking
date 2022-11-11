import { BuyCreditsData } from '@screens/Store';
import { UseFormSetValue } from 'react-hook-form';
import { SwitchSalesTypeContainer, TypeButton, TypeButtonText } from './styles';

interface SwitchSaleTypeProps {
  setValue: UseFormSetValue<BuyCreditsData>;
  type: 'creditCard' | 'pix';
}

export function SwitchSaleType({ type, setValue }: SwitchSaleTypeProps) {
  return (
    <SwitchSalesTypeContainer>
      <TypeButton
        isActive={type === 'creditCard'}
        onPress={() => setValue('type', 'creditCard')}
        spacing={2}
      >
        <TypeButtonText isActive={type === 'creditCard'}>
          Cartão de Crédito
        </TypeButtonText>
      </TypeButton>

      <TypeButton
        isActive={type === 'pix'}
        onPress={() => setValue('type', 'pix')}
        ml={20}
        spacing={1}
      >
        <TypeButtonText isActive={type === 'pix'}>PIX</TypeButtonText>
      </TypeButton>
    </SwitchSalesTypeContainer>
  );
}
