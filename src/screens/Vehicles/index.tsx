import { Button } from '@components/Button';
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
  license_plate: string;
}

export function VehiclesScreen() {
  const [registerVehicleModalIsOpen, setRegisterVehicleModalIsOpen] =
    useState(false);

  const { data: vehicles, refetch } = useQuery<VehicleData[]>(
    ['vehicles'],
    async () => {
      try {
        const response = await apiClient.get<VehicleData[]>(
          ApiRoutes.MY_VEHICLES
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

  function refetchVehicles() {
    refetch();
  }

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
        refetchVehicles={refetchVehicles}
        isOpen={registerVehicleModalIsOpen}
        closeModal={closeRegisterVehicleModal}
      />

      <CarsList>
        {vehicles!.map((vehicle) => (
          <Vehicle
            key={vehicle.id}
            vehicle={{
              id: vehicle.id,
              name: vehicle.name,
              license_plate: vehicle.license_plate,
            }}
            refetchVehicles={refetchVehicles}
          />
        ))}
      </CarsList>
    </ScreenContainer>
  );
}
