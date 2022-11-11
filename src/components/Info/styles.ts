import styled, { css } from 'styled-components/native';

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

interface InfoValueStyle {
  color: 'green' | 'blue' | 'yellow' | 'red';
}

const INFO_COLOR = {
  green: 'GREEN_500',
  blue: 'SKY_500',
  red: 'RED_500',
  yellow: 'YELLOW_500',
} as const;

export const InfoValue = styled.Text<InfoValueStyle>`
  ${({ theme, color }) => css`
    text-align: center;

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XLG};
    color: ${theme.COLORS[INFO_COLOR[color]]};
  `}
`;
