import { SearchInput } from '@components/SearchInput';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { ScrollScreenContainer } from '@styles/defaults';
import { useQuery } from 'react-query';
import { CreditOrder } from './components/CreditOrder';

export function FiscalScreen() {
  const { data: payments } = useQuery(
    ['orders'],
    async () => {
      try {
        const response = await apiClient.get(ApiRoutes.PAYMENTS);

        return response.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [],
    }
  );

  return (
    <ScrollScreenContainer>
      <SearchInput placeholder="Buscar" />

      {payments.map(() => (
        <CreditOrder status="canceled" />
      ))}
    </ScrollScreenContainer>
  );
}
