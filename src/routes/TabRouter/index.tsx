import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserScreen } from '@screens/User';
import { StoreScreen } from '@screens/Store';
import { VehiclesScreen } from '@screens/Vehicles';
import { House, User, Storefront, Car } from 'phosphor-react-native';
import { HomeScreen } from '@screens/Home';
import { useAuthContext } from '@contexts/AuthContext';
import { Roles } from '@enums/roles.enum';
import { AdminScreen } from '@screens/Admin';
import { AppRoutes } from '../../enums/appRoutes.enum';

const Tab = createBottomTabNavigator();

export function TabRouter() {
  const { user } = useAuthContext();

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => undefined,
      }}
    >
      {user?.role === Roles.USER ? (
        <>
          <Tab.Screen
            name={AppRoutes.HOME}
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => <House color={color} size={30} />,
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
        </>
      ) : (
        <Tab.Screen
          name={AppRoutes.HOME}
          component={AdminScreen}
          options={{
            tabBarIcon: ({ color }) => <House color={color} size={30} />,
          }}
        />
      )}
      <Tab.Screen
        name={AppRoutes.USER}
        component={UserScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
