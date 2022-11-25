import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
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
  handleClose: () => void;
}

export function SelectVehicleModal({
  isOpen,
  selectVehiclePlate,
  handleClose,
}: SelectVehicleModalProps) {
  const { data: vehicles } = useQuery<VehicleData[]>(
    ['vehicles'],
    async () => {
      try {
        const response = await apiClient.get<VehicleData[]>(
          ApiRoutes.MY_VEHICLES
        );

        return response.data;
      } catch (error) {
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

      <Button
        text="Fechar"
        bgColor="red"
        variant="outlined"
        onPress={handleClose}
        mt={10}
      />
    </Modal>
  );
}
