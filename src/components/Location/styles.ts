import styled, { css } from 'styled-components/native';

interface LocationContainerStyles {
  color: 'blue' | 'red';
}

const LOCATION_COLOR = {
  blue: 'BLUE_800',
  red: 'RED_500',
} as const;

export const LocationContainer = styled.View<LocationContainerStyles>`
  ${({ theme, color }) => css`
    padding: 5px;
    border-radius: 30px;
    background: ${theme.COLORS[LOCATION_COLOR[color]]};
  `}
`;
