import styled, { css } from 'styled-components/native';

export const SearchInputContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 10px;

    border-radius: 8px;
    padding: 5px;
    border: 1px solid ${theme.COLORS.GRAY_400};
    background: ${theme.COLORS.GRAY_200};
  `}
`;

export const SearchInputField = styled.TextInput.attrs(({ theme }) => ({
  selectionColor: theme.COLORS.BLACK,
}))`
  ${({ theme }) => css`
    padding-left: 10px;
    background: rgba(0, 0, 0, 0);
    font-size: ${theme.FONT_SIZE.LG};
  `}
`;
