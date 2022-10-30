import styled from 'styled-components/native';

export const LoaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 'large',
}))``;
