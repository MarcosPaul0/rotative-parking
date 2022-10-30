import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { StatusBar } from 'react-native';
import { Router } from '@routes/Router';
import { AuthContextProvider } from '@contexts/AuthContext';
import theme from './src/theme/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.COLORS.GRAY_900}
        />
        {fontsLoaded ? <Router /> : <Loading />}
      </AuthContextProvider>
    </ThemeProvider>
  );
}
