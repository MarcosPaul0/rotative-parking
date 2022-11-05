import styled, { css } from 'styled-components/native';

export const Modal = styled.Modal`
  ${({ theme }) => css`
    background: ${theme.COLORS.GRAY_800};
  `}
`;
