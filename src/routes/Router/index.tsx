import { StackRouter } from '@routes/StackRouter';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from '@contexts/AuthContext';

export function RouterProvider() {
  const { COLORS } = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          text: COLORS.GRAY_200,
          card: COLORS.GRAY_700,
          border: COLORS.GRAY_200,
          notification: COLORS.SKY_500,
          primary: COLORS.GRAY_100,
          background: COLORS.GRAY_900,
        },
      }}
    >
      <AuthContextProvider>
        <StackRouter />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
