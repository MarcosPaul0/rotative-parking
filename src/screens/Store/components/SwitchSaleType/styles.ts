import styled, { css } from 'styled-components/native';

export const SwitchSalesTypeContainer = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

interface TypeButtonStyles {
  isActive: boolean;
  mt: number;
  mb: number;
  mr: number;
  ml: number;
  spacing: number;
}

export const TypeButton = styled.TouchableOpacity<TypeButtonStyles>`
  ${({ theme, isActive, mt = 0, mr = 0, mb = 0, ml = 0 }) => css`
    flex: 1;
    align-items: center;
    min-height: 130px;
    max-height: 130px;

    border-radius: 10px;
    padding: 15px 20px;

    margin: ${mt}px ${mr}px ${mb}px ${ml}px;

    border: 2px solid ${theme.COLORS.GREEN_500};
    background: ${isActive ? theme.COLORS.GREEN_500 : 'rgba(0, 0, 0 ,0)'};
  `}
`;

export const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const TypeButtonText = styled.Text<TypeButtonStyles>`
  ${({ theme, isActive }) => css`
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.MD};
    text-align: center;

    color: ${isActive ? theme.COLORS.WHITE : theme.COLORS.GREEN_500};
  `}
`;
