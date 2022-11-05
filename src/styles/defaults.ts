import styled, { css } from 'styled-components/native';

export const ScreenContainer = styled.View`
  flex: 1;
  padding: 18px;
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONTS.REGULAR};
  `}
`;