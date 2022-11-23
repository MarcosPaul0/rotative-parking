import { Modal } from '@components/Modal';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { Vehicle } from './components/Vehicle';

export interface VehicleData {
  id: number;
  name: string;
  license_plate: string;
}

interface SelectVehicleModalProps {
  isOpen: boolean;
  selectVehiclePlate: (vehicleData: VehicleData) => void;
}

export function SelectVehicleModal({
  isOpen,
  selectVehiclePlate,
}: SelectVehicleModalProps) {
  const { user } = useAuthContext();

  const { data: vehicles } = useQuery<VehicleData[]>(
    ['vehicles'],
    async () => {
      try {
        const response = await apiClient.get<VehicleData[]>(
          `${ApiRoutes.VEHICLE}/${user!.id}`
        );

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
      text="Selecione um veículo para realizar a compra de créditos"
      animationType="fade"
      visible={isOpen}
    >
      <ScrollView>
        {vehicles!.map((vehicle) => (
          <Vehicle
            key={vehicle.id}
            vehicle={vehicle}
            onSelectVehicle={selectVehiclePlate}
          />
        ))}
      </ScrollView>
    </Modal>
  );
}
