import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { useAuthContext } from '@contexts/AuthContext';
import { AppRoutes } from '@enums/appRoutes.enum';
import { Validations } from '@enums/validations.enum';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ScreenContainer } from '../../styles/global';

interface LoginData {
  login: string;
  password: string;
}

export function LoginScreen() {
  const { navigate } = useNavigation();

  const { login } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  async function onLogin(data: LoginData) {
    await login(data);
  }

  function navigateToRegisterScreen() {
    navigate(AppRoutes.REGISTER);
  }

  return (
    <ScreenContainer>
      <Card title="Bem Vindo" subtitle="Preencha seus dados para entrar">
        <Input
          label="Email ou CPF"
          errorMessage={errors.login?.message}
          controllerProps={{
            control,
            name: 'login',
            rules: {
              required: { message: Validations.REQUIRED, value: true },
            },
          }}
        />
        <Input
          label="Senha"
          errorMessage={errors.password?.message}
          controllerProps={{
            control,
            name: 'password',
            rules: {
              required: { message: Validations.REQUIRED, value: true },
            },
          }}
          inputProps={{
            textContentType: 'password',
            secureTextEntry: true,
          }}
        />
        <Button text="Entrar" mb={20} onPress={handleSubmit(onLogin)} />
        <Button
          text="Registrar-se"
          variant="outlined"
          onPress={navigateToRegisterScreen}
        />
      </Card>
    </ScreenContainer>
  );
}
