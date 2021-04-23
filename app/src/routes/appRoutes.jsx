import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListOfLists from '../screens/listOfLists';
import GroceryList from '../screens/groceryList';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  const headerOptions = {
    headerStyle: { backgroundColor: 'rgb(248, 110, 69)' },
    headerTintColor: 'rgb(255, 255, 255)',
    headerTitleAlign: 'center',
  };

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="ListOfLists"
        component={ListOfLists}
        options={Object.assign({}, headerOptions, { headerTitle: 'Minhas compras' })}
      />
      <AuthStack.Screen
        name="GroceryList"
        component={GroceryList}
        options={Object.assign({}, headerOptions, { headerTitle: 'Lista' })}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
