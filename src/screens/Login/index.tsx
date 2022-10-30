import { Button } from '@components/Button';
import { Section } from '@components/Section';
import { Input } from '@components/Input';
import { useAuthContext } from '@contexts/AuthContext';
import { AppRoutes } from '@enums/appRoutes.enum';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

export function LoginScreen() {
  const router = useNavigation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { login } = useAuthContext();

  async function onLogin(data) {
    await login(data);
  }

  return (
    <>
      <Section title="Bem Vindo" subtitle="Preencha seus dados para entrar" />
      <Input
        label="Email ou CPF"
        controllerProps={{
          control,
          name: 'email',
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
      <Button text="Entrar" mb={20} onPress={handleSubmit(onLogin)} />
      <Button
        text="Registrar-se"
        variant="outlined"
        onPress={() => router.navigate(AppRoutes.REGISTER)}
      />
    </>
  );
}
