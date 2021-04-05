import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import Register from '../screens/register';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
