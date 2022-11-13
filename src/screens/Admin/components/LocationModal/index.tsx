import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Text } from 'react-native';

interface LocationModalProps {
  name: string;
  price: string;
  vacancies: number;
  isOpen: boolean;
  handleClose: () => void;
}

export function LocationModal({
  name,
  price,
  vacancies,
  isOpen,
  handleClose,
}: LocationModalProps) {
  return (
    <Modal text={name} visible={isOpen}>
      <Text>{price}</Text>
      <Text>{vacancies}</Text>
      <Button text="Fechar" onPress={handleClose} />
    </Modal>
  );
}
