import { ApiRoutes } from '@enums/apiRoutes.enum';
import { StorageItems } from '@enums/storageItems.enum';
import { apiClient } from '@services/apiClient';
import {
  useEffect,
  useState,
  useContext,
  ReactNode,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '@enums/appRoutes.enum';
import { useNotify } from '@hooks/useNotify';
import { Roles } from '@enums/roles.enum';
import { AxiosError } from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  role: Roles;
}

interface LoginParams {
  login: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const { errorNotify } = useNotify();

  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(StorageItems.TOKEN);

      if (token) {
        apiClient.defaults.headers.Authorization = `Bearer ${token}`;

        try {
          const { data } = await apiClient.get<User>(ApiRoutes.ME);
          setUser(data);

          navigate(AppRoutes.TAB_ROUTER);
        } catch {
          await AsyncStorage.removeItem(StorageItems.TOKEN);

          navigate(AppRoutes.LOGIN);
        }
      } else {
        navigate(AppRoutes.LOGIN);
      }
    })();
  }, []);

  async function login({ login, password }: LoginParams) {
    try {
      const response = await apiClient.post(ApiRoutes.LOGIN, {
        login,
        password,
      });

      const { token } = response.data;

      apiClient.defaults.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem(StorageItems.TOKEN, token);

      const { data } = await apiClient.get<User>(ApiRoutes.ME);

      setUser(data);

      navigate(AppRoutes.TAB_ROUTER);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { statusCode } = error.response!.data;

        switch (statusCode) {
          case 401:
            errorNotify({
              title: 'Error ao logar',
              message: 'Email ou senha inválido',
            });
            break;
          case 403:
            errorNotify({
              title: 'Error ao logar',
              message: 'Confirme seu email primeiro',
            });
            break;
          default:
            errorNotify({
              title: 'Error ao logar',
              message: 'Ocorreu algum erro tente novamente mais tarde',
            });
            break;
        }
      }
    }
  }

  async function logout() {
    setUser(null);

    await AsyncStorage.removeItem(StorageItems.TOKEN);

    navigate(AppRoutes.LOGIN);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
