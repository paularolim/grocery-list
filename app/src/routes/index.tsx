import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthRoutes } from './authRoutes';
import { AppRoutes } from './appRoutes';

import { AuthContext } from '../contexts/authContext';

function Routes() {
  const { loading, signed } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#7E549F" />
      </View>
    );
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
