import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {
  watchPositionAsync,
  LocationObject,
  useForegroundPermissions,
  LocationAccuracy,
} from 'expo-location';
import { ScreenContainer, ScrollContainer } from '@styles/defaults';
import { Input } from '@components/Input';
import { useForm } from 'react-hook-form';
import { Button } from '@components/Button';

export function AdminScreen() {
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
    );
  }

  const { control } = useForm({
    defaultValues: {
      latitude: null,
      longitude: null,
      name: '',
      price: null,
      vacancies: 0,
    },
  });

  return (
    <ScrollContainer>
      <MapView
        onMapReady={getLocation}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.6,
        }}
        region={{
          latitude: location?.coords.latitude || -22.4125,
          latitudeDelta: 0.0922,
          longitude: location?.coords.longitude || -45.7972,
          longitudeDelta: 0.0421,
        }}
        followsUserLocation
        showsUserLocation
        minZoomLevel={18}
        maxZoomLevel={18}
      />
      <ScreenContainer>
        <Input
          label="Região"
          controllerProps={{
            control,
            name: 'name',
          }}
        />

        <Input
          label="Preço"
          controllerProps={{
            control,
            name: 'price',
          }}
        />

        <Input
          label="Vagas"
          controllerProps={{
            control,
            name: 'vacancies',
          }}
        />

        <Button text="Adicionar Região" />
      </ScreenContainer>
    </ScrollContainer>
  );
}
