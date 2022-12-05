import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { AppRoutes } from '@enums/appRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { ScrollScreenContainer } from '@styles/defaults';
import { SignOut } from 'phosphor-react-native';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from 'styled-components/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { formatCpf } from '@utils/formatCpf';

interface UpdateUserFormData {
  name: string;
  email: string;
  cpf: string;
  password?: string;
}

export function UserScreen() {
  const { COLORS } = useContext(ThemeContext);

  const [deleteUserModalIsOpen, setDeleteUserModalIsOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<UpdateUserFormData>({
    defaultValues: {
      name: isAuthenticated ? user!.name : '',
      email: isAuthenticated ? user!.email : '',
      cpf: isAuthenticated ? formatCpf(user!.cpf) : '',
      password: '',
    },
  });

  async function updateUser({ name, password }: UpdateUserFormData) {
    try {
      await apiClient.patch(`${ApiRoutes.USER}/${user?.id}`, {
        name,
        password: password || undefined,
      });

      successNotify({
        title: 'Dados atualizados',
        message: 'Seus dados foram atualizados',
      });
      resetField('password');
    } catch (error) {
      errorNotify({
        title: 'Erro ao atualizar',
        message: 'Erro ao atualizar os dados, tente novamente',
      });
    }
  }

  async function deleteUser() {
    try {
      await apiClient.delete(`${ApiRoutes.USER}/${user?.id}`);

      successNotify({
        title: 'Usuário deletado',
        message: 'Seu perfil foi deletado',
        redirectsTo: AppRoutes.LOGIN,
      });
    } catch (error) {
      errorNotify({
        title: 'Erro ao deletar',
        message: 'Erro ao deletar seu perfil, tente novamente',
      });
    }
  }

  function closeDeleteUserModal() {
    setDeleteUserModalIsOpen(false);
  }

  function openDeleteUserModal() {
    setDeleteUserModalIsOpen(true);
  }

  return (
    <ScrollScreenContainer>
      <Modal
        text="Tem certeza que deseja deletar sua conta? Esta é uma decisão definitiva"
        animationType="fade"
        visible={deleteUserModalIsOpen}
      >
        <Button text="Sim" bgColor="red" mt={20} onPress={deleteUser} />
        <Button
          text="Cancelar"
          variant="outlined"
          mt={20}
          onPress={closeDeleteUserModal}
        />
      </Modal>

      <Card title="Meu Perfil" subtitle="Gerencie seu perfil">
        <Input
          label="Nome"
          controllerProps={{
            control,
            name: 'name',
          }}
        />
        <Input
          label="Email"
          controllerProps={{
            control,
            name: 'email',
          }}
          inputProps={{
            editable: false,
          }}
        />
        <Input
          label="CPF"
          inputProps={{
            editable: false,
          }}
          controllerProps={{
            control,
            name: 'cpf',
          }}
        />
        <Input
          label="Nova Senha"
          controllerProps={{
            control,
            name: 'password',
          }}
          inputProps={{
            textContentType: 'password',
            secureTextEntry: true,
          }}
        />

        <Button
          text="Atualizar"
          onPress={handleSubmit(updateUser)}
          isLoading={isSubmitting}
        />

        <Button
          text="Deletar perfil"
          bgColor="red"
          variant="outlined"
          mt={20}
          onPress={openDeleteUserModal}
        />

        <Button
          text="Sair"
          icon={
            <SignOut
              size={22}
              color={COLORS.SKY_500}
              style={{ marginRight: 10 }}
            />
          }
          bgColor="sky"
          variant="outlined"
          mt={20}
          onPress={logout}
        />
      </Card>

      <Toast />
    </ScrollScreenContainer>
  );
}
