import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { AppRoutes } from '@enums/appRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';
import { ScreenContainer } from '../../styles/global';

interface RegisterUserData {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export function RegisterScreen() {
  const { successNotify, errorNotify } = useNotify();

  const { control, handleSubmit } = useForm<RegisterUserData>({
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
  });

  async function onRegisterUser({
    cpf,
    email,
    name,
    password,
  }: RegisterUserData) {
    try {
      await apiClient.post(ApiRoutes.USER, {
        cpf,
        email,
        name,
        password,
      });

      successNotify({
        title: 'Usuário Registrado',
        message: 'Seus dados foram registrados com sucesso!',
        redirectsTo: AppRoutes.LOGIN,
      });
    } catch (error) {
      errorNotify({
        title: 'Error no Registro',
        message: 'Erro ao tentar registrar-se tente novamente',
      });
    }
  }

  return (
    <ScreenContainer>
      <Card title="Bem Vindo" subtitle="Preencha seus dados para entrar">
        <Input
          label="Nome"
          controllerProps={{
            control,
            name: 'name',
          }}
        />

        <Input
          label="CPF"
          controllerProps={{
            control,
            name: 'cpf',
          }}
          inputProps={{
            textContentType: 'postalCode',
          }}
        />
        <Input
          label="Email"
          controllerProps={{
            control,
            name: 'email',
          }}
          inputProps={{
            textContentType: 'emailAddress',
          }}
        />
        <Input
          label="Senha"
          controllerProps={{
            control,
            name: 'password',
          }}
          inputProps={{
            textContentType: 'password',
            secureTextEntry: true,
          }}
        />
        <Button text="Cadastrar" onPress={handleSubmit(onRegisterUser)} />
      </Card>
    </ScreenContainer>
  );
}
