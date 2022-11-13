import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { CreditCard } from '../CreditCard';

interface CreditCardModalProps {
  isOpen: boolean;
  selectCreditCard: (creditCardId: string) => void;
}

export function CreditCardModal({
  isOpen,
  selectCreditCard,
}: CreditCardModalProps) {
  return (
    <Modal
      text="Selecione um cartão para realizar a compra de créditos"
      animationType="fade"
      visible={isOpen}
    >
      <Button text="Adicionar cartão de crédito" />

      <CreditCard
        owner="Marcos Paulo Pereira"
        number="1234123412341234"
        cvc="123"
        dueDate={new Date().toDateString()}
        onSelectCard={() => selectCreditCard('123')}
      />
    </Modal>
  );
}
