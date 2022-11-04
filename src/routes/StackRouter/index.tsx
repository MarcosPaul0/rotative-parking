import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '@screens/Register';
import { LoginScreen } from '@screens/Login';
import { TabRouter } from '@routes/TabRouter';
import { AppRoutes } from '../../enums/appRoutes.enum';

const Stack = createStackNavigator();

export function StackRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AppRoutes.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={AppRoutes.TAB_ROUTER} component={TabRouter} />
    </Stack.Navigator>
  );
}
