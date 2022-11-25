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
import { useQuery } from 'react-query';
import { apiClient } from '@services/apiClient';
import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Location } from '@components/Location';
import { InfosContainer } from './styles';
import { LocationModal } from './components/LocationModal';

export interface Location {
  id: number;
  region: string;
  price: number;
  latitude: number;
  longitude: number;
  parking_lots: number;
}

export function HomeScreen() {
  const [availableParkingLots, setAvailableParkingLots] = useState(0);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [status, requestPermission] = useForegroundPermissions();
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);

  const { data: regions } = useQuery<Location[]>(
    ['regions'],
    async () => {
      try {
        const response = await apiClient.get<Location[]>(ApiRoutes.REGIONS);

        return response.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [] as Location[],
    }
  );

  useEffect(() => {
    async () => {
      if (!status?.granted) {
        await requestPermission();
      }
    };
  }, []);

  async function getRegionData(locationId: number) {
    try {
      const response = await apiClient.get(
        `${ApiRoutes.PARKING_LOTS}/${locationId}`
      );

      setAvailableParkingLots(response.data);
    } catch {
      setAvailableParkingLots(0);
    }
  }

  async function getLocation() {
    await watchPositionAsync({ accuracy: LocationAccuracy.High }, (location) =>
      setLocation(location)
    ).catch(() => setLocation(initialLocation));
  }

  const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);

  function openLocationModal() {
    setLocationModalIsOpen(true);
  }

  function handleCloseLocationModal() {
    setLocationModalIsOpen(false);
  }

  return (
    <>
      {activeLocation && (
        <LocationModal
          isOpen={locationModalIsOpen}
          handleClose={handleCloseLocationModal}
          location={activeLocation}
        />
      )}

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
        showsUserLocation
        minZoomLevel={18}
        maxZoomLevel={18}
      >
        {regions?.map((location) => (
          <Location
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onLocationPress={() => {
              setActiveLocation(location);
              getRegionData(location.id);
              openLocationModal();
            }}
          />
        ))}
      </MapView>
      <InfosContainer>
        <Info label="Vagas Disponíveis" value={availableParkingLots} />
        <Info label="Tempo Restante" value="00:00" color="red" />
      </InfosContainer>
    </>
  );
}
