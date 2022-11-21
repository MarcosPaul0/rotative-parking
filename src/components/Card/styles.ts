import styled, { css } from 'styled-components/native';

export const CardContainer = styled.View`
  ${({ theme }) => css`
    padding: 18px;
    padding-bottom: 30px;
    margin-bottom: 36px;
    background: ${theme.COLORS.GRAY_800};
    border-radius: 10px;
  `}
`;

export const TextContainer = styled.View`
  width: 100%;
  margin-bottom: 28px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.COLORS.GRAY_100};

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XXLG};
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
