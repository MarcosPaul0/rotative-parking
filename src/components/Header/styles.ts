import styled, { css } from 'styled-components/native';

export const HeaderContainer = styled.View`
  ${({ theme }) => css`
    padding: 8px;
    background: ${theme.COLORS.GRAY_700};
    flex-direction: row;
  `}
`;

export const CreditsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const CreditsNumber = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XSM};
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.GRAY_100};
    margin-right: 7px;
  `}
`;
