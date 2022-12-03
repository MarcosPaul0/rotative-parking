import { Card } from '@components/Card';
import { ScreenContainer } from '@styles/defaults';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { Checks } from 'phosphor-react-native';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { AppRoutes } from '@enums/appRoutes.enum';

interface RouteParams {
  validate: string;
}

export function SuccessCardSale() {
  const route = useRoute();
  const { validate } = route.params as RouteParams;

  const { navigate } = useNavigation();

  const { COLORS } = useContext(ThemeContext);

  function goToHome() {
    navigate(AppRoutes.HOME);
  }

  return (
    <ScreenContainer>
      <Card
        title="Pagamento Solicitado"
        subtitle={`Após a confirmação do pagamento você poderá utilizar a Zona Azul até ${validate}`}
      >
        <Checks size={50} color={COLORS.GREEN_500} />

        <Button
          text="Voltar para o Início"
          onPress={goToHome}
          mt={10}
          variant="outlined"
        />
      </Card>
    </ScreenContainer>
  );
}
