import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { Location } from '@screens/Admin';
import { LeftText, LineContainer, RightText } from '@screens/Store/styles';
import { apiClient } from '@services/apiClient';
import { formatPrice } from '@utils/formatPrice';
import { useState } from 'react';
import { UpdateLocationModal } from '../UpdateLocationModal';

interface LocationModalProps {
  location: Location;
  isOpen: boolean;
  handleClose: () => void;
  refetchRegions: () => void;
}

export function LocationModal({
  location,
  isOpen,
  handleClose,
  refetchRegions,
}: LocationModalProps) {
  const { successNotify, errorNotify } = useNotify();

  async function handleDeleteRegion() {
    try {
      await apiClient.delete(`${ApiRoutes.REGIONS}/${location.id}`);

      refetchRegions();
      successNotify({
        title: 'Região Deletada',
        message: 'A região foi deletada com sucesso!',
      });
      handleClose();
    } catch {
      errorNotify({
        title: 'Erro ao Deletar',
        message: 'Ocorreu um erro ao deletar a região, tente novamente!',
      });
    }
  }

  const [updateRegionModalIsOpen, setUpdateRegionModalIsOpen] = useState(false);

  function handleOpenUpdateRegionModal() {
    handleClose();
    setUpdateRegionModalIsOpen(true);
  }

  function closeUpdateRegionModal() {
    setUpdateRegionModalIsOpen(false);
  }

  return (
    <>
      {updateRegionModalIsOpen && (
        <UpdateLocationModal
          isOpen
          handleClose={closeUpdateRegionModal}
          location={location}
          refetchRegions={refetchRegions}
        />
      )}

      <Modal text={location.region} visible={isOpen}>
        <LineContainer>
          <LeftText>Preço da região</LeftText>
          <RightText>{formatPrice(location.price)}</RightText>
        </LineContainer>

        <LineContainer>
          <LeftText>Número de vagas</LeftText>
          <RightText>{location.parking_lots}</RightText>
        </LineContainer>
        <Button
          text="Atualizar Região"
          onPress={handleOpenUpdateRegionModal}
          mt={20}
        />
        <Button
          text="Deletar Região"
          bgColor="red"
          onPress={handleDeleteRegion}
          mt={20}
        />
        <Button
          text="Fechar"
          variant="outlined"
          onPress={handleClose}
          mt={20}
        />
      </Modal>
    </>
  );
}
