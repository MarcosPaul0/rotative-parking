import { SearchInput } from '@components/SearchInput';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { ScreenContainer } from '@styles/defaults';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { CreditOrder } from './components/CreditOrder';
import { PaymentsContainer } from './components/CreditOrder/styles';

interface Payment {
  id: number;
  license_plate: string;
  status: 'approved' | 'pending' | 'canceled';
  created_at: string;
}

export function FiscalScreen() {
  const [searchPlate, setSearchPlate] = useState('');

  const { data: payments } = useQuery<Payment[]>(
    ['orders', searchPlate],
    async () => {
      try {
        const filter =
          searchPlate.length > 0 ? `?license_plate=${searchPlate}` : '';

        const response = await apiClient.get<Payment[]>(
          `${ApiRoutes.PAYMENTS}${filter}`
        );

        return response.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [] as Payment[],
    }
  );

  function handleSearch(text: string) {
    setSearchPlate(text);
  }

  return (
    <ScreenContainer>
      <SearchInput
        placeholder="Buscar"
        onChangeText={handleSearch}
        value={searchPlate}
      />

      <PaymentsContainer>
        {payments!.map((payment) => (
          <CreditOrder
            key={payment.id}
            status={payment.status}
            plate={payment.license_plate}
            createdAt={payment.created_at}
          />
        ))}
      </PaymentsContainer>
    </ScreenContainer>
  );
}
