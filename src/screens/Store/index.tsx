import { Card } from '@components/Card';
import { ScreenContainer } from '@styles/defaults';
import { useForm } from 'react-hook-form';
import { SwitchSaleType } from './components/SwitchSaleType';

export interface BuyCreditsData {
  type: 'creditCard' | 'pix';
}

export function StoreScreen() {
  const { setValue, watch } = useForm<BuyCreditsData>({
    defaultValues: {
      type: 'creditCard',
    },
  });

  const typeWatched = watch('type');

  return (
    <ScreenContainer>
      <Card
        title="Comprar Créditos"
        subtitle="Compre créditos de estacionamento"
      >
        <SwitchSaleType setValue={setValue} type={typeWatched} />
      </Card>
    </ScreenContainer>
  );
}
