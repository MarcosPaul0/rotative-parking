import styled, { css } from "styled-components/native";

export const LoginContainer = styled.View`
  ${({ theme }) => css`
    flex: 1;
    align-items: center;
  `}
`;

const BaseText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_900};
  `}
`;

export const Title = styled(BaseText)`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XLG};
  `}
`;

export const SubTitle = styled(BaseText)`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
  `}
`;
