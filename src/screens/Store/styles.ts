import styled, { css } from 'styled-components/native';

export const LineContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

const BaseText = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const RightText = styled(BaseText)`
  text-align: right;
`;

export const LeftText = styled(BaseText)`
  text-align: left;
`;

export const SelectContainer = styled.TouchableOpacity`
  ${({ theme }) => css`
    margin-top: 10px;

    border: 2px solid ${theme.COLORS.GRAY_400};
    border-radius: 10px;
    padding: 10px;
  `}
`;

export const SelectText = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.COLORS.GRAY_400};
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
  `}
`;
