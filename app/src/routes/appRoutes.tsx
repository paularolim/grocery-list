import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListOfLists from '../screens/listOfLists';
import GroceryList from '../screens/groceryList';
import Profile from '../screens/profile';
import About from '../screens/about';

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
      <AuthStack.Screen
        name="Profile"
        component={Profile}
        options={Object.assign({}, headerOptions, { headerTitle: 'Meu perfil' })}
      />
      <AuthStack.Screen
        name="About"
        component={About}
        options={Object.assign({}, headerOptions, { headerTitle: 'Sobre' })}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
