import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Location } from '@screens/Admin';
import { LeftText, LineContainer, RightText } from '@screens/Store/styles';
import { formatPrice } from '@utils/formatPrice';

interface LocationModalProps {
  location: Location;
  isOpen: boolean;
  handleClose: () => void;
}

export function LocationModal({
  location,
  isOpen,
  handleClose,
}: LocationModalProps) {
  return (
    <Modal text={location.region} visible={isOpen}>
      <LineContainer>
        <LeftText>Preço da região</LeftText>
        <RightText>{formatPrice(location.price)}</RightText>
      </LineContainer>

      <LineContainer>
        <LeftText>Número de vagas</LeftText>
        <RightText>{location.parking_lots}</RightText>
      </LineContainer>
      <Button text="Fechar" variant="outlined" onPress={handleClose} mt={20} />
    </Modal>
  );
}
