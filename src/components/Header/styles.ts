import styled, { css } from 'styled-components/native';

export const HeaderContainer = styled.View`
  ${({ theme }) => css`
    height: 30px;
    background: ${theme.COLORS.GRAY_900};
  `}
`;
