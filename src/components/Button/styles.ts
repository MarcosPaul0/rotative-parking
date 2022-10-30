import styled, { css } from 'styled-components/native';

export interface ButtonProps {
  color: 'red' | 'yellow' | 'green' | 'sky';
  variant: 'filled' | 'outlined';
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
  ${({ theme, color, variant, mt, mb, mr, ml }) => css`
    width: 100%;
    padding: 12px 15px;
    align-items: center;
    margin: ${mt}px ${mr}px ${mb}px ${ml}px;

    border-radius: 6px;
    background: ${variant === 'filled'
      ? theme.COLORS[COLOR_TYPES[color]]
      : 'rgba(0, 0, 0, 0)'};
    border: ${variant === 'filled'
      ? 'none'
      : `solid 1px ${theme.COLORS[COLOR_TYPES[color]]}`};
  `}
`;

export const ButtonText = styled.Text<ButtonProps>`
  ${({ theme, color, variant }) => css`
    font-family: ${theme.FONTS.BOLD};
    color: ${variant === 'filled'
      ? theme.COLORS.GRAY_100
      : theme.COLORS[COLOR_TYPES[color]]};
  `}
`;