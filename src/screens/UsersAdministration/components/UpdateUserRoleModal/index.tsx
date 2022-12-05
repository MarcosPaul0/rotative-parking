import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Roles } from '@enums/roles.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';
import { UserData } from '../User';

interface UpdateUserRoleFormData {
  role: Roles;
}

interface UpdateUserRoleModalProps {
  user: UserData;
  isOpen: boolean;
  closeModal: () => void;
  refetchUsers: () => void;
}

export function UpdateUserRoleModal({
  user,
  isOpen,
  closeModal,
  refetchUsers,
}: UpdateUserRoleModalProps) {
  const { errorNotify, successNotify } = useNotify();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateUserRoleFormData>({
    defaultValues: {
      role: user.role,
    },
  });

  const roleWatched = watch('role');

  function handleChangeRole(newRole: Roles) {
    setValue('role', newRole);
  }

  async function updateUserRole({ role }: UpdateUserRoleFormData) {
    try {
      await apiClient.patch(`${ApiRoutes.USER}/${user.id}`, {
        role,
      });

      successNotify({
        title: 'Usuário atualizado',
        message: 'O cargo do usuário foi atualizado com sucesso!',
      });
      refetchUsers();
      closeModal();
    } catch {
      errorNotify({
        title: 'Erro ao atualizar o usuário',
        message:
          'Ocorreu um erro ao atualizar o cargo do usuário, tente novamente!',
      });
    }
  }

  return (
    <Modal visible={isOpen} text="Atualiza o cargo do veículo">
      <Button
        text="ADMINISTRADOR"
        onPress={() => handleChangeRole(Roles.ADMIN)}
        variant={roleWatched === Roles.ADMIN ? 'filled' : 'outlined'}
        bgColor="yellow"
        mt={10}
      />
      <Button
        text="FISCAL"
        onPress={() => handleChangeRole(Roles.FISCAL)}
        variant={roleWatched === Roles.FISCAL ? 'filled' : 'outlined'}
        bgColor="yellow"
        mt={10}
      />
      <Button
        text="USUÁRIO COMUM"
        onPress={() => handleChangeRole(Roles.USER)}
        variant={roleWatched === Roles.USER ? 'filled' : 'outlined'}
        bgColor="yellow"
        mt={10}
      />
      <Button
        text="GUARDA"
        variant="outlined"
        disabled
        mt={10}
        bgColor="yellow"
      />

      <Button
        text="Atualizar"
        onPress={handleSubmit(updateUserRole)}
        isLoading={isSubmitting}
        // variant={isDirty ? 'filled' : 'outlined'}
        mt={30}
      />
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
