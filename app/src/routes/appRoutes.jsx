import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import ListOfLists from '../screens/listOfLists';
import GroceryList from '../screens/groceryList';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="ListOfLists"
        component={ListOfLists}
        options={{ headerTitle: 'Minhas listas' }}
      />
      <AuthStack.Screen
        name="GroceryList"
        component={GroceryList}
        options={{ headerTitle: 'Lista de compras' }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
