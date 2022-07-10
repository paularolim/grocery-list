import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface AuthContextProps {
  loading: boolean;
  signed: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  signIn?: (email: string, password: string) => Promise<void>;
  signOut?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  loading: false,
  signed: false,
  user: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      const storagedToken = await AsyncStorage.getItem('@MeuMercado:token');
      const storagedUser = await AsyncStorage.getItem('@MeuMercado:user');

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    loadStorage();
  }, []);

  const signIn = async (email, password) => {
    try {
      const data = {
        email,
        password,
      };
      const response = await api.post('/login', data);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      await AsyncStorage.setItem('@MeuMercado:token', response.data.token);
      await AsyncStorage.setItem(
        '@MeuMercado:user',
        JSON.stringify(response.data.user),
      );

      setUser(response.data.user);
    } catch (Exception) {
      // eslint-disable-next-line no-console
      console.log(Exception);
    }
  };

  const signOut = async () => {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  };

  const value = useMemo(
    () => ({
      loading,
      signed: Boolean(user),
      user,
      signIn,
      signOut,
    }),
    [loading, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
