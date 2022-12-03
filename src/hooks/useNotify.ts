import { AppRoutes } from '@enums/appRoutes.enum';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';

interface NotifyOptions {
  title: string;
  message: string;
  redirectsTo?: AppRoutes;
}

interface NotifyParams {
  title: string;
  message: string;
}

export function useNotify() {
  const { navigate } = useNavigation();

  function successNotify({ title, message, redirectsTo }: NotifyOptions) {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
    !!redirectsTo && navigate(redirectsTo);
  }

  function errorNotify({ title, message, redirectsTo }: NotifyOptions) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
    !!redirectsTo && navigate(redirectsTo);
  }

  function infoNotify({ title, message, redirectsTo }: NotifyOptions) {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
    });
    !!redirectsTo && navigate(redirectsTo);
  }

  function notify({ title, message }: NotifyParams) {
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
      },
      trigger: {
        seconds: 10,
      },
    });
  }

  return { successNotify, errorNotify, infoNotify, notify };
}
