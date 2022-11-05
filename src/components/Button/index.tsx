import { TouchableOpacityProps } from 'react-native';
import { ButtonContainer, ButtonText, Loader } from './styles';

export interface ButtonProps extends TouchableOpacityProps {
  text: string;
  bgColor?: 'red' | 'yellow' | 'green' | 'sky';
  variant?: 'filled' | 'outlined' | 'text';
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  isLoading?: boolean;
}

export function Button({
  bgColor = 'sky',
  text,
  variant = 'filled',
  mt = 0,
  mb = 0,
  mr = 0,
  ml = 0,
  isLoading,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = isLoading || disabled;

  return (
    <ButtonContainer
      color={bgColor}
      variant={variant}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <ButtonText color={bgColor} variant={variant}>
          {text}
        </ButtonText>
      )}
    </ButtonContainer>
  );
}
