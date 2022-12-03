import styled, { css } from 'styled-components/native';

export const SuccessContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Code = styled.Text`
  ${({ theme }) => css`
    margin: 10px 0;
    max-height: 88px;
    border-radius: 10px;
    border: 1px solid ${theme.COLORS.GRAY_400};
    background: ${theme.COLORS.GRAY_700};
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONTS.REGULAR};
    overflow: hidden;
    text-align: center;
    padding: 5px 5px 7px 5px;
  `}
`;
