import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';

interface DeleteUserModalProps {
  userId: number;
  isOpen: boolean;
  closeModal: () => void;
  refetchUsers: () => void;
}

export function DeleteUserModal({
  userId,
  isOpen,
  closeModal,
  refetchUsers,
}: DeleteUserModalProps) {
  const { errorNotify, successNotify } = useNotify();

  async function deleteUser(userId: number) {
    try {
      await apiClient.delete(`${ApiRoutes.USER}/${userId}`);

      refetchUsers();
      successNotify({
        title: 'Usuário deletado',
        message: 'O usuário foi deletado com sucesso',
      });
    } catch {
      errorNotify({
        title: 'Erro ao deletar o usuário',
        message: 'Ocorreu um erro ao deletar o usuário, tente novamente',
      });
    }
  }

  return (
    <Modal
      visible={isOpen}
      text="Tem certeza que deseja deletar o usuário? Essa é uma decisão definitiva"
    >
      <Button text="Deletar" onPress={() => deleteUser(userId)} />
      <Button
        text="Cancelar"
        variant="outlined"
        bgColor="red"
        onPress={closeModal}
        mt={10}
      />
    </Modal>
  );
}
