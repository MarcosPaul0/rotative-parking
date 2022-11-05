import { IconButton } from '@components/IconButton';
import { CarData } from '@screens/Vehicles';
import { Pen, Trash } from 'phosphor-react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import { UpdateCarModal } from '../UpdateCarModal';
import {
  ButtonsContainer,
  CarContainer,
  CarPlate,
  CarTitle,
  ContentContainer,
} from './styles';

interface CarProps {
  car: CarData;
  onUpdate: (car: CarData) => void;
  onDelete: (carId: number) => void;
}

export function Car({ car, onUpdate, onDelete }: CarProps) {
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
      <UpdateCarModal
        key={car.id}
        car={car}
        isOpen={updateCarModalIsOpen}
        onCloseModal={closeUpdateCarModal}
        onUpdateCar={onUpdate}
      />

      <CarContainer>
        <ContentContainer>
          <CarTitle>{car.name}</CarTitle>
          <CarPlate>{car.plate}</CarPlate>
        </ContentContainer>

        <ButtonsContainer>
          <IconButton
            icon={<Pen color={COLORS.GRAY_100} />}
            bgColor="yellow"
            onPress={openUpdateCarModal}
          />
          <IconButton
            icon={<Trash color={COLORS.GRAY_100} />}
            bgColor="red"
            onPress={() => onDelete(car.id)}
            ml={10}
          />
        </ButtonsContainer>
      </CarContainer>
    </>
  );
}
