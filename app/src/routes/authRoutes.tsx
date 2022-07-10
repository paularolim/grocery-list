import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { Login } from '../screens/login';
import { Register } from '../screens/register';

const AuthStack = createStackNavigator();

const headerOptions: StackNavigationOptions = {
  headerTitle: 'Meu mercado',
  headerStyle: { backgroundColor: 'rgb(248, 110, 69)' },
  headerTintColor: 'rgb(255, 255, 255)',
  headerTitleAlign: 'center',
};

export function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={headerOptions}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={headerOptions}
      />
    </AuthStack.Navigator>
  );
}
