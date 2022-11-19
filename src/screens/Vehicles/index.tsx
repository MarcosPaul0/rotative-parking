import { Button } from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { ScreenContainer } from '@styles/defaults';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Vehicle } from './components/Vehicle';
import { RegisterVehicleModal } from './components/RegisterVehicleModal';
import { CarsList } from './styles';

export interface VehicleData {
  id: number;
  name: string;
  plate: string;
}

export function VehiclesScreen() {
  const [registerVehicleModalIsOpen, setRegisterVehicleModalIsOpen] =
    useState(false);

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

  function openRegisterVehicleModal() {
    setRegisterVehicleModalIsOpen(true);
  }

  function closeRegisterVehicleModal() {
    setRegisterVehicleModalIsOpen(false);
  }

  return (
    <ScreenContainer>
      <Button text="Novo Veículo" onPress={openRegisterVehicleModal} />

      <RegisterVehicleModal
        isOpen={registerVehicleModalIsOpen}
        closeModal={closeRegisterVehicleModal}
      />

      <CarsList>
        {vehicles!.map((vehicle) => (
          <Vehicle
            vehicle={{
              id: vehicle.id,
              name: vehicle.name,
              plate: vehicle.plate,
            }}
          />
        ))}
      </CarsList>
    </ScreenContainer>
  );
}
