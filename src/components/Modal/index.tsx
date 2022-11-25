import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useContext } from 'react';
import { Modal as RNModal, ModalProps as RNModalProps } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ContentContainer, ModalContainer, ModalText } from './styles';

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
  const { COLORS } = useContext(ThemeContext);

  return (
    <RNModal transparent {...rest}>
      <ModalContainer>
        <LinearGradient
          style={{
            borderRadius: 10,
            padding: 20,
            width: '100%',
            maxHeight: '80%',
          }}
          colors={[COLORS.GRAY_700, COLORS.GRAY_800]}
        >
          <ContentContainer>
            <ModalText type={textType}>{text}</ModalText>

            {children}
          </ContentContainer>
        </LinearGradient>
      </ModalContainer>

      <Toast />
    </RNModal>
  );
}
