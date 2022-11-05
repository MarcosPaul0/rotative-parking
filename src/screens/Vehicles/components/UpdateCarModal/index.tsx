import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { CarData } from '@screens/Vehicles';
import { useForm } from 'react-hook-form';

interface UpdateCarModalProps {
  car: CarData;
  onUpdateCar: (car: CarData) => void;
  isOpen: boolean;
  onCloseModal: () => void;
}

export function UpdateCarModal({
  car,
  isOpen,
  onUpdateCar,
  onCloseModal,
}: UpdateCarModalProps) {
  const { control, handleSubmit } = useForm<CarData>({
    defaultValues: {
      id: car.id,
      name: car.name,
      plate: car.plate,
    },
  });

  return (
    <Modal visible={isOpen} text="Atualize os dados do carro">
      <Input
        label="Nome"
        controllerProps={{
          control,
          name: 'name',
        }}
      />
      <Input
        label="Placa"
        controllerProps={{
          control,
          name: 'plate',
        }}
      />

      <Button text="Atualizar" onPress={handleSubmit(onUpdateCar)} />
      <Button
        text="Cancelar"
        variant="outlined"
        bgColor="red"
        onPress={onCloseModal}
        mt={10}
      />
    </Modal>
  );
}
