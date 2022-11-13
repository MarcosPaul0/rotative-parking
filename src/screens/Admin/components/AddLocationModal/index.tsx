import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { RegisterLocationData } from '@screens/Admin';
import { useFormContext } from 'react-hook-form';

interface AddLocationModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function AddLocationModal({
  isOpen,
  handleClose,
}: AddLocationModalProps) {
  const { control } = useFormContext<RegisterLocationData>();

  return (
    <Modal
      text="Preencha os campos para cadastrar uma nova região de zona azul"
      visible={isOpen}
    >
      <Input
        label="Região"
        controllerProps={{
          control,
          name: 'name',
        }}
      />

      <Input
        label="Preço"
        controllerProps={{
          control,
          name: 'price',
        }}
      />

      <Input
        label="Vagas"
        controllerProps={{
          control,
          name: 'vacancies',
        }}
      />

      <Button text="Adicionar Região" />
      <Button text="Cancelar" bgColor="red" onPress={handleClose} mt={10} />
    </Modal>
  );
}
