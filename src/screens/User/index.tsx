import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { ScreenContainer } from '@styles/defaults';
import { useForm } from 'react-hook-form';

interface UpdateUserData {
  name: string;
  email: string;
  cpf: string;
}

export function UserScreen() {
  const { user, isAuthenticated } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateUserData>({
    defaultValues: {
      name: isAuthenticated ? user!.name : '',
      email: isAuthenticated ? user!.email : '',
      cpf: isAuthenticated ? user!.cpf : '',
    },
  });

  async function updateUser({ name, email, cpf }: UpdateUserData) {
    try {
      await apiClient.patch(`${ApiRoutes.USER}/${user?.id}`, {
        name,
        email,
        cpf,
      });

      successNotify({
        title: 'Dados atualizados',
        message: 'Seus dados foram atualizados',
      });
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
      });
    } catch (error) {
      errorNotify({
        title: 'Erro ao deletar',
        message: 'Erro ao deletar seu perfil, tente novamente',
      });
    }
  }

  return (
    <ScreenContainer>
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
        />
        <Input
          label="CPF"
          controllerProps={{
            control,
            name: 'cpf',
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
          onPress={deleteUser}
        />
      </Card>
    </ScreenContainer>
  );
}
