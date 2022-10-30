import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '@screens/Login';
import { UserScreen } from '@screens/User';
import { StoreScreen } from '@screens/Store';
import { VehiclesScreen } from '@screens/Vehicles';
import { House, User, Storefront, Car } from 'phosphor-react-native';
import { AppRoutes } from '../../enums/appRoutes.enum';

const Tab = createBottomTabNavigator();

export function TabRouter() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => undefined,
      }}
    >
      <Tab.Screen
        name={AppRoutes.HOME}
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name={AppRoutes.USER}
        component={UserScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name={AppRoutes.STORE}
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Storefront color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name={AppRoutes.VEHICLES}
        component={VehiclesScreen}
        options={{
          tabBarIcon: ({ color }) => <Car color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
