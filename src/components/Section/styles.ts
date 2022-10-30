import styled, { css } from 'styled-components/native';

// export const CardContainer = styled(LinearGradient).attrs(({ theme }) => ({
//   colors: theme.GRADIENTS.CARD,
//   start: [1, 1],
// }))``;

export const TextContainer = styled.View`
  width: 100%;
  margin-bottom: 28px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.COLORS.GRAY_100};

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XLG};
  `}
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.COLORS.GRAY_200};

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
  `}
`;
