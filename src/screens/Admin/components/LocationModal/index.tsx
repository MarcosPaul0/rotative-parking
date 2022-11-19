import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { LeftText, LineContainer, RightText } from '@screens/Store/styles';

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
      <LineContainer>
        <LeftText>Preço da região</LeftText>
        <RightText>{price}</RightText>
      </LineContainer>

      <LineContainer>
        <LeftText>Número de vagas</LeftText>
        <RightText>{vacancies}</RightText>
      </LineContainer>
      <Button text="Fechar" onPress={handleClose} mt={20} />
    </Modal>
  );
}
