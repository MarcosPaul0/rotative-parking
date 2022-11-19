import styled, { css } from 'styled-components/native';

export const NumberInputContainer = styled.View`
  flex-direction: row;
`;

export const NumberContent = styled.Text`
  ${({ theme }) => css`
    padding: 8px 10px;
    font-size: ${theme.FONT_SIZE.XLG};
    font-family: ${theme.FONTS.BOLD};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const BaseNumberInputButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background: ${theme.COLORS.SKY_500};
    padding: 8px;
    align-items: center;
    justify-content: center;
  `}
`;

export const AddInputButton = styled(BaseNumberInputButton)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const RemoveInputButton = styled(BaseNumberInputButton)`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
