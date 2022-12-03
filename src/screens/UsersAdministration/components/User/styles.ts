import styled, { css } from 'styled-components/native';

export const UserContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
`;

export const LineContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

const BaseText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONTS.BOLD};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const RightText = styled(BaseText)`
  text-align: right;
  flex: 1;
`;

export const LeftText = styled(BaseText)`
  text-align: left;
`;

export const ContentContainer = styled.View`
  ${({ theme }) => css`
    border-radius: 10px;
    padding: 13px 10px;
    margin-right: 10px;
    flex: 1;

    background: ${theme.COLORS.GRAY_700};
    border: 1px solid ${theme.COLORS.GRAY_400};
  `}
`;

export const ButtonsContainer = styled.View`
  ${({ theme }) => css`
    border-radius: 10px;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: ${theme.COLORS.GRAY_700};
    border: 1px solid ${theme.COLORS.GRAY_400};
  `}
`;
