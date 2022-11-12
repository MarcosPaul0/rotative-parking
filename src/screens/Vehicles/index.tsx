import { Button } from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { ScreenContainer } from '@styles/defaults';
import { useEffect, useState } from 'react';
import { Car } from './components/Car';
import { RegisterCarModal } from './components/RegisterCarModal';
import { CarsList } from './styles';

export interface CarData {
  id: number;
  name: string;
  plate: string;
}

export function VehiclesScreen() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [registerCarModalIsOpen, setRegisterCarModalIsOpen] = useState(false);

  const { user } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  useEffect(() => {
    (async () => {
      try {
        const { data: cars } = await apiClient.get<CarData[]>(
          `${ApiRoutes.CARS}/${user!.id}`
        );

        setCars(cars);
      } catch {
        setCars([]);
      }
    })();
  }, []);

  async function updateCar({ id, name, plate }: CarData) {
    try {
      await apiClient.patch(`${ApiRoutes.CARS}/${id}`, {
        name,
        plate,
      });

      successNotify({
        title: 'Carro atualizado',
        message: 'O carro foi atualizado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao atualizar o carro',
        message: 'Ocorreu um erro ao atualizar o carro, tente novamente',
      });
    }
  }

  async function deleteCar(cardId: number) {
    try {
      await apiClient.delete(`${ApiRoutes.CARS}/${cardId}`);

      successNotify({
        title: 'Carro deletado',
        message: 'O carro foi deletado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao deletar o carro',
        message: 'Ocorreu um erro ao deletar o carro, tente novamente',
      });
    }
  }

  function openRegisterCarModal() {
    setRegisterCarModalIsOpen(true);
  }

  function closeRegisterCarModal() {
    setRegisterCarModalIsOpen(false);
  }

  return (
    <ScreenContainer>
      <Button text="Novo Veículo" onPress={openRegisterCarModal} />

      <RegisterCarModal
        isOpen={registerCarModalIsOpen}
        onCloseModal={closeRegisterCarModal}
      />

      <CarsList>
        {/* {cars.map((car) => (
          <Car
            key={car.id}
            car={car}
            onUpdate={updateCar}
            onDelete={deleteCar}
          />
        ))} */}
        <Car
          car={{
            id: 12,
            name: 'Carro 1',
            plate: '1234-fed',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
        <Car
          car={{
            id: 12,
            name: 'Carro 2',
            plate: '4567-oiu',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
        <Car
          car={{
            id: 12,
            name: 'Carro 3',
            plate: '1154-qwe',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
        <Car
          car={{
            id: 12,
            name: 'Carro 3',
            plate: '1154-qwe',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
        <Car
          car={{
            id: 12,
            name: 'Carro 3',
            plate: '1154-qwe',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
        <Car
          car={{
            id: 12,
            name: 'Carro 3',
            plate: '1154-qwe',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
        <Car
          car={{
            id: 12,
            name: 'Carro 3',
            plate: '1154-qwe',
          }}
          onUpdate={updateCar}
          onDelete={deleteCar}
        />
      </CarsList>
    </ScreenContainer>
  );
}
