import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { Region } from '../Region';

export interface RegionData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  price: number;
}

interface SelectCreditCardModalProps {
  isOpen: boolean;
  selectRegion: (region: RegionData) => void;
}

export function SelectRegionModal({
  isOpen,
  selectRegion,
}: SelectCreditCardModalProps) {
  const { data: regions } = useQuery<RegionData[]>(
    ['regions'],
    async () => {
      try {
        const response = await apiClient.get<RegionData[]>(ApiRoutes.REGIONS);

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
    <Modal
      text="Selecione uma região para realizar a compra de créditos"
      animationType="fade"
      visible={isOpen}
    >
      <ScrollView>
        {regions!.map((region) => (
          <Region
            key={region.id}
            region={region.name}
            onPress={() => selectRegion(region)}
          />
        ))}
      </ScrollView>
    </Modal>
  );
}
