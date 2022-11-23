import { IconButton } from '@components/IconButton';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { VehicleData } from '@screens/Vehicles';
import { apiClient } from '@services/apiClient';
import { Pen, Trash } from 'phosphor-react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import { UpdateVehicleModal } from '../UpdateVehicleModal';
import {
  ButtonsContainer,
  VehicleContainer,
  VehiclePlate,
  VehicleTitle,
  ContentContainer,
} from './styles';

interface VehicleProps {
  vehicle: VehicleData;
  refetchVehicles: () => void;
}

export function Vehicle({ vehicle, refetchVehicles }: VehicleProps) {
  const { COLORS } = useContext(ThemeContext);

  const { errorNotify, successNotify } = useNotify();

  async function deleteVehicle(cardId: number) {
    try {
      await apiClient.delete(`${ApiRoutes.VEHICLE}/${cardId}`);

      refetchVehicles();
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

  const [updateCarModalIsOpen, setUpdateCarModalIsOpen] = useState(false);

  function openUpdateCarModal() {
    setUpdateCarModalIsOpen(true);
  }

  function closeUpdateCarModal() {
    setUpdateCarModalIsOpen(false);
  }

  return (
    <>
      <UpdateVehicleModal
        key={vehicle.id}
        vehicle={vehicle}
        isOpen={updateCarModalIsOpen}
        closeModal={closeUpdateCarModal}
        refetchVehicles={refetchVehicles}
      />

      <VehicleContainer>
        <ContentContainer>
          <VehicleTitle>{vehicle.name}</VehicleTitle>
          <VehiclePlate>{vehicle.license_plate}</VehiclePlate>
        </ContentContainer>

        <ButtonsContainer>
          <IconButton
            icon={<Pen color={COLORS.BLACK} />}
            bgColor="yellow"
            onPress={openUpdateCarModal}
          />
          <IconButton
            icon={<Trash color={COLORS.GRAY_100} />}
            bgColor="red"
            onPress={() => deleteVehicle(vehicle.id)}
            ml={10}
          />
        </ButtonsContainer>
      </VehicleContainer>
    </>
  );
}
