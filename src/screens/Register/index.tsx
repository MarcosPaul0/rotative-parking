import { Button } from '@components/Button';
import { Section } from '@components/Section';
import { Input } from '@components/Input';
import { useForm } from 'react-hook-form';

export function Register() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
  });

  async function onRegisterUser(data) {
    console.log(data);
  }

  return (
    <>
      <Section title="Bem Vindo" subtitle="Preencha seus dados para entrar" />
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
    </>
  );
}
