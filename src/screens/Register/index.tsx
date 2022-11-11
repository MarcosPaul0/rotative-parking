import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { AppRoutes } from '@enums/appRoutes.enum';
import { Patterns } from '@enums/patterns.enum';
import { Validations } from '@enums/validations.enum';
import { useNotify } from '@hooks/useNotify';
import { apiClient } from '@services/apiClient';
import { useForm } from 'react-hook-form';
import { ScreenContainer } from '../../styles/defaults';

interface RegisterUserData {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export function RegisterScreen() {
  const { successNotify, errorNotify } = useNotify();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserData>({
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
  });

  async function registerUser({
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
        title: 'Usuário registrado',
        message: 'Seus dados foram registrados com sucesso!',
        redirectsTo: AppRoutes.LOGIN,
      });
    } catch (error) {
      errorNotify({
        title: 'Erro ao registrar-se',
        message: 'Erro ao tentar registrar-se tente novamente',
      });
    }
  }

  return (
    <ScreenContainer>
      <Card title="Bem Vindo" subtitle="Preencha seus dados para entrar">
        <Input
          label="Nome"
          errorMessage={errors.name?.message}
          controllerProps={{
            control,
            name: 'name',
            rules: {
              required: {
                value: true,
                message: Validations.REQUIRED,
              },
            },
          }}
        />

        <Input
          label="CPF"
          errorMessage={errors.cpf?.message}
          controllerProps={{
            control,
            name: 'cpf',
            rules: {
              required: {
                value: true,
                message: Validations.REQUIRED,
              },
              pattern: {
                value: Patterns.CPF,
                message: Validations.CPF,
              },
            },
          }}
          inputProps={{
            textContentType: 'postalCode',
          }}
        />
        <Input
          label="Email"
          errorMessage={errors.email?.message}
          controllerProps={{
            control,
            name: 'email',
            rules: {
              required: {
                value: true,
                message: Validations.REQUIRED,
              },
              pattern: {
                value: Patterns.EMAIL,
                message: Validations.EMAIL,
              },
            },
          }}
          inputProps={{
            textContentType: 'emailAddress',
          }}
        />
        <Input
          label="Senha"
          errorMessage={errors.password?.message}
          controllerProps={{
            control,
            name: 'password',
            rules: {
              required: {
                value: true,
                message: Validations.REQUIRED,
              },
              pattern: {
                value: Patterns.PASSWORD,
                message: Validations.PASSWORD,
              },
            },
          }}
          inputProps={{
            textContentType: 'password',
            secureTextEntry: true,
          }}
        />

        <Button
          text="Cadastrar"
          onPress={handleSubmit(registerUser)}
          isLoading={isSubmitting}
        />
      </Card>
    </ScreenContainer>
  );
}
