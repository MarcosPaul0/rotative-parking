import { Car } from 'phosphor-react-native';
import { useContext } from 'react';
import { Marker } from 'react-native-maps';
import { ThemeContext } from 'styled-components/native';
import { LocationContainer } from './styles';

interface LocationProps {
  latitude: number;
  longitude: number;
  onLocationPress?: () => void;
  color?: 'blue' | 'red';
}

export function Location({
  latitude,
  longitude,
  onLocationPress,
  color = 'blue',
}: LocationProps) {
  const { COLORS } = useContext(ThemeContext);

  return (
    <Marker
      coordinate={{
        latitude,
        longitude,
      }}
      onPress={onLocationPress}
    >
      <LocationContainer color={color}>
        <Car size={32} color={COLORS.GRAY_100} />
      </LocationContainer>
    </Marker>
  );
}
