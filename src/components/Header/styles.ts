import styled, { css } from 'styled-components/native';

export const HeaderContainer = styled.View`
  ${({ theme }) => css`
    padding: 8px;
    background: ${theme.COLORS.GRAY_700};
  `}
`;
