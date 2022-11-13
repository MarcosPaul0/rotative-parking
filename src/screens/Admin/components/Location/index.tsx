import { Car } from 'phosphor-react-native';
import { useContext } from 'react';
import { Marker } from 'react-native-maps';
import { ThemeContext } from 'styled-components/native';
import { LocationContainer } from './styles';

interface LocationProps {
  latitude: number;
  longitude: number;
  onLocationPress?: () => void;
}

export function Location({
  latitude,
  longitude,
  onLocationPress,
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
      <LocationContainer>
        <Car size={32} color={COLORS.GRAY_100} />
      </LocationContainer>
    </Marker>
  );
}
