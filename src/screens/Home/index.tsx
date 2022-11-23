import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {
  watchPositionAsync,
  LocationObject,
  useForegroundPermissions,
  LocationAccuracy,
} from 'expo-location';
import { Info } from '@components/Info';
import { initialLocation } from '@utils/initialLocation';
import { InfosContainer } from './styles';

export function HomeScreen() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [status, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    async () => {
      if (!status?.granted) {
        await requestPermission();
      }
    };
  }, []);

  async function getLocation() {
    await watchPositionAsync({ accuracy: LocationAccuracy.High }, (location) =>
      setLocation(location)
    ).catch(() => setLocation(initialLocation));
  }

  return (
    <>
      <MapView
        onMapReady={getLocation}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.65,
        }}
        region={{
          latitude:
            location?.coords.latitude || initialLocation.coords.latitude,
          latitudeDelta: 0.0922,
          longitude:
            location?.coords.longitude || initialLocation.coords.longitude,
          longitudeDelta: 0.0421,
        }}
        followsUserLocation
        showsUserLocation
        minZoomLevel={18}
        maxZoomLevel={18}
      />
      <InfosContainer>
        <Info label="Vagas Disponíveis" value="35" />
        <Info label="Tempo Restante" value="00:00" color="red" />
      </InfosContainer>
    </>
  );
}
