import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {
  watchPositionAsync,
  LocationObject,
  useForegroundPermissions,
  LocationAccuracy,
} from 'expo-location';
import { ViewContainer } from '@styles/defaults';
import { useForm, FormProvider } from 'react-hook-form';
import { Map } from '@enums/map.enum';
import { Location } from '@screens/Admin/components/Location';
import { formatPrice } from '@utils/formatPrice';
import { Button } from '@components/Button';
import { LocationModal } from './components/LocationModal';
import { ButtonContainer } from './styles';
import { AddLocationModal } from './components/AddLocationModal';

export interface RegisterLocationData {
  latitude: number;
  longitude: number;
  name: string;
  price: number;
  vacancies: number;
}

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  price: number;
  vacancies: number;
}

export function AdminScreen() {
  const [markers, setMarkers] = useState<Location[]>([
    {
      id: 1,
      latitude: -22.4247,
      longitude: -45.4601,
      name: 'Inicio',
      price: 7.5,
      vacancies: 12,
    },
  ]);
  const [markerActive, setMarkerActive] = useState<Location>({
    id: 1,
    latitude: -22.4247,
    longitude: -45.4601,
    name: 'Inicio',
    price: 7.5,
    vacancies: 12,
  });
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

  const formMethods = useForm<RegisterLocationData>({
    defaultValues: {
      latitude: 0,
      longitude: 0,
      name: '',
      price: 0,
      vacancies: 0,
    },
  });

  const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);

  function openLocationModal() {
    setLocationModalIsOpen(true);
  }

  function handleCloseLocationModal() {
    setLocationModalIsOpen(false);
  }

  function handlePressLocation(location: Location) {
    setMarkerActive(location);
    openLocationModal();
  }

  const [addLocationModalIsOpen, setAddLocationModalIsOpen] = useState(false);

  function handleOpenAddLocationModal() {
    setAddLocationModalIsOpen(true);
  }

  function handleCloseAddLocationModal() {
    setAddLocationModalIsOpen(false);
  }

  return (
    <FormProvider {...formMethods}>
      <ViewContainer>
        <LocationModal
          isOpen={locationModalIsOpen}
          name={markerActive!.name}
          price={formatPrice(markerActive!.price)}
          vacancies={markerActive!.vacancies}
          handleClose={handleCloseLocationModal}
        />

        <AddLocationModal
          isOpen={addLocationModalIsOpen}
          handleClose={handleCloseAddLocationModal}
        />

        <ButtonContainer>
          <Button
            text="Adicionar Região"
            onPress={handleOpenAddLocationModal}
          />
        </ButtonContainer>

        <MapView
          onMapReady={getLocation}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          region={{
            latitude: location?.coords.latitude || -22.4247,
            latitudeDelta: Map.LATITUDE_DELTA,
            longitude: location?.coords.longitude || -45.4601,
            longitudeDelta: Map.LONGITUDE_DELTA,
          }}
          followsUserLocation
          showsUserLocation
          minZoomLevel={18}
          maxZoomLevel={18}
        >
          {markers.map((location) => (
            <Location
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
              onLocationPress={() => handlePressLocation(location)}
            />
          ))}
        </MapView>
      </ViewContainer>
    </FormProvider>
  );
}
