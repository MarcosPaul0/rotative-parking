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
    font-family: ${theme.FONTS.REGULAR};
    font-size: ${theme.FONT_SIZE.LG};
  `}
`;
