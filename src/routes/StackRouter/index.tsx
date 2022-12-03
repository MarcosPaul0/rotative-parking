import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '@screens/Register';
import { LoginScreen } from '@screens/Login';
import { TabRouter } from '@routes/TabRouter';
import { OutStoreScreen } from '@screens/OutStore';
import { Header } from '@components/Header';
import { SuccessPixSale } from '@screens/SuccessPixSale';
import { SuccessCardSale } from '@screens/SuccessCardSale';
import { AppRoutes } from '../../enums/appRoutes.enum';

const Stack = createStackNavigator();

export function StackRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen name={AppRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AppRoutes.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={AppRoutes.OUT_STORE} component={OutStoreScreen} />
      <Stack.Screen name={AppRoutes.TAB_ROUTER} component={TabRouter} />
      <Stack.Screen
        name={AppRoutes.SUCCESS_CARD_SALE}
        component={SuccessCardSale}
      />
      <Stack.Screen
        name={AppRoutes.SUCCESS_PIX_SALE}
        component={SuccessPixSale}
      />
    </Stack.Navigator>
  );
}
