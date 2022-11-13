// eslint-disable-next-line no-unused-vars
import { TextInputProps } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { SearchInputContainer, SearchInputField } from './styles';

export function SearchInput(inputProps: TextInputProps) {
  const { COLORS } = useContext(ThemeContext);

  return (
    <SearchInputContainer>
      <MagnifyingGlass size={32} color={COLORS.GRAY_900} />
      <SearchInputField {...inputProps} />
    </SearchInputContainer>
  );
}
