import { VehicleData } from '@screens/Vehicles';
import { VehiclePlate, VehicleTitle, ContentContainer } from './styles';

interface VehicleProps {
  vehicle: VehicleData;
  onSelectVehicle: (vehicleData: VehicleData) => void;
}

export function Vehicle({ vehicle, onSelectVehicle }: VehicleProps) {
  return (
    <ContentContainer onPress={() => onSelectVehicle(vehicle)}>
      <VehicleTitle>{vehicle.name}</VehicleTitle>
      <VehiclePlate>{vehicle.plate}</VehiclePlate>
    </ContentContainer>
  );
}
