import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { useAuthContext } from '@contexts/AuthContext';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { apiClient } from '@services/apiClient';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { CreditCard } from '../CreditCard';
import { RegisterCreditCardModal } from '../RegisterCreditCardModal';

export interface CreditCardData {
  created_at: string;
  cardName: string;
  cvc: number;
  deleted_at: string | null;
  expirationMonth: number;
  expirationYear: number;
  id: number;
  number: string;
  ownerId: number;
  updated_at: string;
  flag: string;
}

interface SelectCreditCardModalProps {
  isOpen: boolean;
  selectCreditCard: (creditCardData: CreditCardData) => void;
  handleClose: () => void;
}

export function SelectCreditCardModal({
  isOpen,
  selectCreditCard,
  handleClose,
}: SelectCreditCardModalProps) {
  const { user } = useAuthContext();

  const { data: creditCards, refetch } = useQuery<CreditCardData[]>(
    ['creditCards'],
    async () => {
      try {
        const response = await apiClient.get<CreditCardData[]>(
          `${ApiRoutes.CREDIT_CARDS_BY_USER}/${user!.id}`
        );

        return response.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [],
    }
  );

  function refetchCreditCards() {
    refetch();
  }

  const [registerCreditCardModalIsOpen, setRegisterCreditCardModalIsOpen] =
    useState(false);

  function openRegisterCreditCardModal() {
    setRegisterCreditCardModalIsOpen(true);
  }

  function closeRegisterCreditCardModal() {
    setRegisterCreditCardModalIsOpen(false);
  }

  return (
    <>
      <RegisterCreditCardModal
        isOpen={registerCreditCardModalIsOpen}
        closeModal={closeRegisterCreditCardModal}
        refetchCreditCards={refetchCreditCards}
      />
      <Modal
        text="Selecione um cartão para realizar a compra de créditos"
        animationType="fade"
        visible={isOpen}
      >
        <Button
          text="Adicionar cartão de crédito"
          onPress={openRegisterCreditCardModal}
        />

        <ScrollView>
          {creditCards!.map((creditCard) => {
            const formattedDate = `${creditCard.expirationMonth}/${creditCard.expirationYear}`;

            return (
              <CreditCard
                key={creditCard.id}
                cardName={creditCard.cardName}
                number={creditCard.number}
                cvc={String(creditCard.cvc)}
                dueDate={formattedDate}
                onSelectCard={() => selectCreditCard(creditCard)}
              />
            );
          })}
        </ScrollView>

        <Button
          text="Fechar"
          bgColor="red"
          variant="outlined"
          onPress={handleClose}
          mt={10}
        />
      </Modal>
    </>
  );
}
