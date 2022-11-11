import styled, { css } from 'styled-components/native';

export const InfosContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const InfoContainer = styled.View`
  ${({ theme }) => css`
    border-radius: 10px;
    padding: 10px;
    margin: 20px 10px;
    justify-content: center;

    flex: 1;
    background: ${theme.COLORS.GRAY_700};
  `}
`;

export const InfoLabel = styled.Text`
  ${({ theme }) => css`
    text-align: center;

    font-family: ${theme.FONTS.REGULAR};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const InfoText = styled.Text`
  ${({ theme }) => css`
    text-align: center;

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XLG};
    color: ${theme.COLORS.GREEN_500};
  `}
`;
