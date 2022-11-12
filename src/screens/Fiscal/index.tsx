import { Card } from '@components/Card';
import { ScreenContainer } from '@styles/defaults';
import { PurchasedCredit } from './components/PurchasedCreditsList';

export function FiscalScreen() {
  return (
    <ScreenContainer>
      <PurchasedCredit status="canceled" />
      <PurchasedCredit status="paid" />
      <PurchasedCredit status="pending" />
    </ScreenContainer>
  );
}
