import { Minus, Plus } from 'phosphor-react-native';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  AddInputButton,
  NumberContent,
  NumberInputContainer,
  RemoveInputButton,
} from './styles';

interface NumberInputProps {
  number: number;
  add: () => void;
  remove: () => void;
}

export function NumberInput({ number, add, remove }: NumberInputProps) {
  const { COLORS } = useContext(ThemeContext);

  return (
    <NumberInputContainer>
      <RemoveInputButton onPress={remove}>
        <Minus size={32} color={COLORS.GRAY_100} />
      </RemoveInputButton>
      <NumberContent>{number}</NumberContent>
      <AddInputButton onPress={add}>
        <Plus size={32} color={COLORS.GRAY_100} />
      </AddInputButton>
    </NumberInputContainer>
  );
}
