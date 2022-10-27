import styled, { css } from "styled-components/native";

export const LoaderContainer = styled.View`
  ${({ theme }) => css`
    background: ${theme.COLORS.GRAY_100};

    flex: 1;
    align-items: center;
    justify-content: center;
  `}
`;

export const Loader = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_900,
  size: 'large'
}))``;
