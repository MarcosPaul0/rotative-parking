import { TouchableOpacityProps } from 'react-native';
import { RegionOption, RegionText } from './styles';

interface RegionProps extends TouchableOpacityProps {
  region: string;
}

export function Region({ region, ...rest }: RegionProps) {
  return (
    <RegionOption {...rest}>
      <RegionText>{region}</RegionText>
    </RegionOption>
  );
}
