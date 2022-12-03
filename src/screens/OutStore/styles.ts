import styled, { css } from 'styled-components/native';

export const SelectContainer = styled.TouchableOpacity`
  ${({ theme }) => css`
    margin: 10px 0;

    border: 2px solid ${theme.COLORS.GRAY_400};
    border-radius: 10px;
    padding: 10px;
  `}
`;
