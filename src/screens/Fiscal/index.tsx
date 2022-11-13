import { SearchInput } from '@components/SearchInput';
import { ScrollScreenContainer } from '@styles/defaults';
import { CreditOrder } from './components/CreditOrder';

export function FiscalScreen() {
  return (
    <ScrollScreenContainer>
      <SearchInput placeholder="Buscar" />
      <CreditOrder status="canceled" />
      <CreditOrder status="paid" />
      <CreditOrder status="pending" />
      <CreditOrder status="pending" />
      <CreditOrder status="pending" />
      <CreditOrder status="pending" />
      <CreditOrder status="pending" />
    </ScrollScreenContainer>
  );
}
