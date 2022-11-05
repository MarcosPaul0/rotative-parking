import { TouchableOpacityProps } from 'react-native';
import { ReactNode } from 'react';
import { ButtonContainer } from './styles';

export interface IconButtonProps extends TouchableOpacityProps {
  icon: ReactNode;
  bgColor?: 'red' | 'yellow' | 'green' | 'sky';
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

export function IconButton({
  icon,
  bgColor = 'sky',
  mt = 0,
  mb = 0,
  mr = 0,
  ml = 0,
  ...rest
}: IconButtonProps) {
  return (
    <ButtonContainer color={bgColor} mt={mt} mb={mb} mr={mr} ml={ml} {...rest}>
      {icon}
    </ButtonContainer>
  );
}
