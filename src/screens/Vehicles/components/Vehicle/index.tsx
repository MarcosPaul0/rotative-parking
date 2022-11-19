import { IconButton } from '@components/IconButton';
import { VehicleData } from '@screens/Vehicles';
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
  onUpdate: (vehicle: VehicleData) => void;
  onDelete: (vehicleId: number) => void;
}

export function Vehicle({ vehicle, onUpdate, onDelete }: VehicleProps) {
  const { COLORS } = useContext(ThemeContext);

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
        onCloseModal={closeUpdateCarModal}
        onUpdateVehicle={onUpdate}
      />

      <VehicleContainer>
        <ContentContainer>
          <VehicleTitle>{vehicle.name}</VehicleTitle>
          <VehiclePlate>{vehicle.plate}</VehiclePlate>
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
            onPress={() => onDelete(vehicle.id)}
            ml={10}
          />
        </ButtonsContainer>
      </VehicleContainer>
    </>
  );
}
