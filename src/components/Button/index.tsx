import { TouchableProps } from 'react-native-svg';
import { ButtonContainer, ButtonText } from './styles';

export interface ButtonProps extends TouchableProps {
  text: string;
  bgColor?: 'red' | 'yellow' | 'green' | 'sky';
  variant?: 'filled' | 'outlined';
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

export function Button({
  bgColor = 'sky',
  text,
  variant = 'filled',
  mt = 0,
  mb = 0,
  mr = 0,
  ml = 0,
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer
      color={bgColor}
      variant={variant}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      {...rest}
    >
      <ButtonText color={bgColor} variant={variant}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
}
