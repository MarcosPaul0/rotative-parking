import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { StatusBar } from 'react-native';
import { RouterProvider } from '@routes/Router';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@services/queryClient';
import theme from './src/theme/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {fontsLoaded ? (
          <>
            <StatusBar
              barStyle="light-content"
              backgroundColor={theme.COLORS.GRAY_700}
            />
            <RouterProvider />
          </>
        ) : (
          <Loading />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
