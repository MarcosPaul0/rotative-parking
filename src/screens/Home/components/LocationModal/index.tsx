import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Location } from '@screens/Admin';
import { LeftText, LineContainer, RightText } from '@screens/Store/styles';
import { formatPrice } from '@utils/formatPrice';

interface LocationModalProps {
  location: Location;
  isOpen: boolean;
  handleClose: () => void;
}

export function LocationModal({
  location,
  isOpen,
  handleClose,
}: LocationModalProps) {
  // ACÚMULO DE CRÉDITOS COMO FUTURA FEATURE
  // const { errorNotify, successNotify } = useNotify();

  // const priceInCents = location.price * 100;
  // const unitCreditInCents = 10;

  // const unitValue = priceInCents / unitCreditInCents;

  // const [credits, setCredits] = useState(unitValue);

  // const finalDate = format(
  //   addHours(new Date(), credits / unitValue),
  //   'dd/MM/yy hh:mm:ss',
  //   {
  //     locale: ptBR,
  //   }
  // );

  // function addCredit() {
  //   setCredits((currentCredit) => Math.round(currentCredit + unitValue));
  // }

  // function removeCredit() {
  //   setCredits((currentCredit) => {
  //     const newValue = Math.round(currentCredit - unitValue);

  //     if (newValue <= unitValue) {
  //       return unitValue;
  //     }

  //     return newValue;
  //   });
  // }

  // async function useCredits() {
  //   try {
  //     await apiClient.post(ApiRoutes.USE_CREDITS, {
  //       credits,
  //     });

  //     successNotify({
  //       title: 'Créditos usados',
  //       message: `A utilização da zona azul expira ${finalDate}`,
  //     });
  //   } catch {
  //     errorNotify({
  //       title: 'Erro nos créditos',
  //       message: 'Erro ao utilizar créditos, tente novamente!',
  //     });
  //   }
  // }

  return (
    <Modal text={location.region} visible={isOpen}>
      <LineContainer>
        <LeftText>Preço da região</LeftText>
        <RightText>{formatPrice(location.price)}</RightText>
      </LineContainer>

      <LineContainer>
        <LeftText>Vagas disponíveis</LeftText>
        <RightText>{location.parking_lots}</RightText>
      </LineContainer>

      {/* <LineContainer>
        <LeftText>Quantidade de Créditos</LeftText>

        <NumberInput number={credits} add={addCredit} remove={removeCredit} />
      </LineContainer>

      <LineContainer>
        <LeftText>Válido até</LeftText>
        <RightText>{finalDate}</RightText>
      </LineContainer>

      <Button
        text="Usar Créditos"
        onPress={() => setCredits(unitValue)}
        mt={20}
      /> */}
      <Button text="Fechar" variant="outlined" onPress={handleClose} mt={10} />
    </Modal>
  );
}
