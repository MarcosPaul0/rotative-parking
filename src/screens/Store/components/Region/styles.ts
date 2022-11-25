import styled, { css } from 'styled-components/native';

export const RegionOption = styled.TouchableOpacity`
  ${({ theme }) => css`
    background: ${theme.COLORS.GRAY_600};
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
  `}
`;

export const RegionText = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS.GRAY_200};
  `}
`;
