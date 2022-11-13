import styled, { css } from 'styled-components/native';

export const LocationContainer = styled.View`
  ${({ theme }) => css`
    padding: 5px;
    border-radius: 30px;
    background: ${theme.COLORS.BLUE_800};
  `}
`;
