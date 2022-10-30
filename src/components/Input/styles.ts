import styled, { css } from 'styled-components/native';

export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD};
  `}
`;

export const InputField = styled.TextInput.attrs(({ theme }) => ({
  selectionColor: theme.COLORS.BLACK,
}))`
  ${({ theme }) => css`
    padding: 0 5px;
    width: 100%;
    min-height: 42px;
    max-height: 42px;

    border-radius: 6px;
    font-size: 16px;

    border: 1px solid ${theme.COLORS.GRAY_700};
    background: ${theme.COLORS.GRAY_800};
    color: ${theme.COLORS.WHITE};
  `}
`;
