import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      const storagedToken = await AsyncStorage.getItem('@MeuMercado:token');
      const storagedUser = await AsyncStorage.getItem('@MeuMercado:user');

      if (storagedToken && storagedUser) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

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
      const data = { email, password };
      const response = await api.post('/login', data);

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      await AsyncStorage.setItem('@MeuMercado:token', response.data.token);
      await AsyncStorage.setItem('@MeuMercado:user', JSON.stringify(response.data.user));

      setUser(response.data.user);
    } catch (Exception) {
      console.log(Exception);
    }
  };

  const signOut = async () => {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ loading, signed: Boolean(user), user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
