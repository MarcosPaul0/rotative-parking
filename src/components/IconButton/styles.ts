import styled, { css } from 'styled-components/native';

export interface ButtonProps {
  color: 'red' | 'yellow' | 'green' | 'sky';
}

export interface ButtonContainerProps extends ButtonProps {
  mt: number;
  mb: number;
  mr: number;
  ml: number;
}

const COLOR_TYPES = {
  red: 'RED_500',
  green: 'GREEN_500',
  yellow: 'YELLOW_500',
  sky: 'SKY_500',
} as const;

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  ${({ theme, color, mt, mb, mr, ml }) => css`
    padding: 10px 15px;
    align-items: center;
    margin: ${mt}px ${mr}px ${mb}px ${ml}px;

    border-radius: 6px;
    background: ${theme.COLORS[COLOR_TYPES[color]]};
    border: solid 1px ${theme.COLORS[COLOR_TYPES[color]]};
  `}
`;

export const Loader = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 'large',
}))``;
