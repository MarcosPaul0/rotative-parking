import { Button } from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { ScreenContainer } from '@styles/defaults';
import { useEffect, useState } from 'react';
import { Vehicle } from './components/Vehicle';
import { RegisterVehicleModal } from './components/RegisterVehicleModal';
import { CarsList } from './styles';

export interface VehicleData {
  id: number;
  name: string;
  plate: string;
}

export function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [registerVehicleModalIsOpen, setRegisterVehicleModalIsOpen] =
    useState(false);

  const { user } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get<VehicleData[]>(
          `${ApiRoutes.VEHICLE}/${user!.id}`
        );

        setVehicles(response.data);
      } catch {
        setVehicles([]);
      }
    })();
  }, []);

  async function updateVehicle({ id, name, plate }: VehicleData) {
    try {
      await apiClient.patch(`${ApiRoutes.VEHICLE}/${id}`, {
        name,
        plate,
      });

      successNotify({
        title: 'Veículo atualizado',
        message: 'O veículo foi atualizado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao atualizar o veículo',
        message: 'Ocorreu um erro ao atualizar o veículo, tente novamente',
      });
    }
  }

  async function deleteVehicle(cardId: number) {
    try {
      await apiClient.delete(`${ApiRoutes.VEHICLE}/${cardId}`);

      successNotify({
        title: 'Veículo deletado',
        message: 'O veículo foi deletado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao deletar o veículo',
        message: 'Ocorreu um erro ao deletar o veículo, tente novamente',
      });
    }
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
        isOpen={registerVehicleModalIsOpen}
        onCloseModal={closeRegisterVehicleModal}
      />

      <CarsList>
        <Vehicle
          vehicle={{
            id: 12,
            name: 'Carro 1',
            plate: '1234-fed',
          }}
          onUpdate={updateVehicle}
          onDelete={deleteVehicle}
        />
      </CarsList>
    </ScreenContainer>
  );
}
