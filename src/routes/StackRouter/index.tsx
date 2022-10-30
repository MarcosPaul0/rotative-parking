import { createStackNavigator } from '@react-navigation/stack';
import { Register } from '@screens/Register';
import { TabRouter } from '@routes/TabRouter';
import { AppRoutes } from '../../enums/appRoutes.enum';

const Stack = createStackNavigator();

export function StackRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabRouter" component={TabRouter} />
      <Stack.Screen name={AppRoutes.REGISTER} component={Register} />
    </Stack.Navigator>
  );
}
