import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components/native';
import { AuthProvider } from './src/contexts/authContext';

import Routes from './src/routes';
import { lightTheme } from './src/global/theme';

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
