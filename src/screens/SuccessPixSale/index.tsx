import { ScreenContainer } from '@styles/defaults';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { useNotify } from '@hooks/useNotify';
import { AppRoutes } from '@enums/appRoutes.enum';
import { Card } from '@components/Card';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Code, SuccessContainer } from './styles';
import logoImg from '../../assets/icon.png';

interface RouteParams {
  ticketUrl: string;
  tokenQrCode: string;
  validate: string;
}

export function SuccessPixSale() {
  const route = useRoute();
  const { tokenQrCode, ticketUrl, validate } = route.params as RouteParams;

  const { navigate } = useNavigation();

  const { successNotify } = useNotify();

  async function copyToClipboard() {
    await Clipboard.setStringAsync(tokenQrCode);

    successNotify({
      title: 'Código copiado',
      message: 'O código PIX foi copiado com sucesso!',
    });
  }

  function goToHome() {
    navigate(AppRoutes.HOME);
  }

  return (
    <ScreenContainer>
      <Card
        title="Pedido Realizado"
        subtitle={`Copie o código e realize o pagamento para prosseguir com a utilização da Zona Azul até ${validate}`}
      >
        <SuccessContainer>
          <QRCode
            value={ticketUrl}
            logo={logoImg}
            logoBorderRadius={10}
            size={200}
          />
        </SuccessContainer>

        <Code>{tokenQrCode}</Code>
        <Button text="Copiar Código Pix" onPress={copyToClipboard} />
        <Button
          text="Voltar para o Início"
          onPress={goToHome}
          mt={10}
          variant="outlined"
        />
      </Card>

      <Toast />
    </ScreenContainer>
  );
}
