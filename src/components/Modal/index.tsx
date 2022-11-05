import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useContext } from 'react';
import { Modal as RNModal, ModalProps as RNModalProps } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { ModalContainer, ModalText } from './styles';

interface ModalProps extends RNModalProps {
  text?: string;
  children: ReactNode;
  textType?: 'text' | 'title';
}

export function Modal({
  text,
  textType = 'text',
  children,
  ...rest
}: ModalProps) {
  const { GRADIENTS } = useContext(ThemeContext);

  const [leftColor, rightColor] = GRADIENTS.CARD;

  return (
    <RNModal transparent {...rest}>
      <ModalContainer>
        <LinearGradient
          style={{
            borderRadius: 10,
            padding: 20,
            width: '100%',
          }}
          colors={[leftColor, rightColor]}
        >
          <ModalText type={textType}>{text}</ModalText>

          {children}
        </LinearGradient>
      </ModalContainer>
    </RNModal>
  );
}
