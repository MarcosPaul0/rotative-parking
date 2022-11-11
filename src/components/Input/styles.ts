import styled, { css } from 'styled-components/native';

interface InputStyle {
  hasError: boolean;
}

export const InputContainer = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD};
  `}
`;

export const InputField = styled.TextInput.attrs(({ theme }) => ({
  selectionColor: theme.COLORS.GRAY_100,
}))<InputStyle>`
  ${({ theme, hasError }) => css`
    padding: 0 5px;
    width: 100%;
    min-height: 42px;
    max-height: 42px;

    border-radius: 6px;
    font-size: ${theme.FONT_SIZE.MD};

    border: 1px solid ${hasError ? theme.COLORS.RED_500 : theme.COLORS.GRAY_400};
    background: ${theme.COLORS.GRAY_500};
    color: ${hasError ? theme.COLORS.RED_500 : theme.COLORS.WHITE};
  `}
`;

export const ErrorMessage = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XSM};
    color: ${theme.COLORS.RED_500};
    height: 22px;
  `}
`;
