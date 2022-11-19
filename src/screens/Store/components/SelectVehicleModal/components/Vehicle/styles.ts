import styled, { css } from 'styled-components/native';

export const ContentContainer = styled.TouchableOpacity`
  ${({ theme }) => css`
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    flex: 1;
    align-items: center;

    background: ${theme.COLORS.GRAY_700};
    border: 1px solid ${theme.COLORS.GRAY_400};
  `}
`;

export const VehicleTitle = styled.Text`
  ${({ theme }) => css`
    line-height: 32px;
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XXLG};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const VehiclePlate = styled.Text`
  ${({ theme }) => css`
    line-height: 18px;
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS.GRAY_300};
  `}
`;
