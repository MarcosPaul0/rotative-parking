import { ApiRoutes } from '@enums/apiRoutes.enum';
import { StorageItems } from '@enums/storageItems.enum';
import { apiClient } from '@services/apiClient';
import {
  useMemo,
  useEffect,
  useState,
  useContext,
  ReactNode,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  name: string;
  email: string;
  cpf: string;
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

  useEffect(() => {
    async function auth() {
      const token = await AsyncStorage.getItem(StorageItems.TOKEN);

      if (token) {
        // const { data: user } = await apiClient.get<User>(ApiRoutes.USER);
        // setUser(user);
      }
    }

    auth();
  }, []);

  console.log(user);

  async function login({ login, password }: LoginParams) {
    try {
      const {
        data: { token },
      } = await apiClient.post(ApiRoutes.LOGIN, {
        login,
        password,
      });

      apiClient.defaults.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem(StorageItems.TOKEN, token);

      const { data: user } = await apiClient.get<User>(ApiRoutes.USER);

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    setUser(null);

    await AsyncStorage.removeItem(StorageItems.TOKEN);
  }

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    []
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
