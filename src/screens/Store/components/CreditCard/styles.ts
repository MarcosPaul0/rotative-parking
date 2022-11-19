import styled, { css } from 'styled-components/native';

const BaseText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const OwnerText = styled(BaseText)`
  ${({ theme }) => css`
    text-align: center;
    text-transform: uppercase;

    font-family: ${theme.FONTS.REGULAR};
    font-size: ${theme.FONT_SIZE.LG};
    margin-bottom: 5px;
  `}
`;

export const CreditCardContainer = styled.TouchableOpacity`
  ${({ theme }) => css`
    margin-top: 10px;
    padding: 20px 10px;
    border-radius: 10px;
    background: ${theme.COLORS.GRAY_600};
  `}
`;

export const CreditCardNumber = styled(BaseText)`
  ${({ theme }) => css`
    text-align: center;

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.XLG};
  `}
`;

export const LineContainer = styled.View`
  margin: 0 40px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  padding-top: 5px;
`;

export const Label = styled(BaseText)`
  ${({ theme }) => css`
    text-align: left;

    font-family: ${theme.FONTS.REGULAR};
    font-size: ${theme.FONT_SIZE.SM};
  `}
`;

export const Value = styled(BaseText)`
  ${({ theme }) => css`
    text-align: left;

    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
  `}
`;
