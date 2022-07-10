import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { ListOfLists } from '../screens/listOfLists';
import { GroceryList } from '../screens/groceryList';
import { Profile } from '../screens/profile';
import { About } from '../screens/about';

const AuthStack = createStackNavigator();

const headerOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: 'rgb(248, 110, 69)' },
  headerTintColor: 'rgb(255, 255, 255)',
  headerTitleAlign: 'center',
};

export function AppRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="ListOfLists"
        component={ListOfLists}
        options={{ ...headerOptions, headerTitle: 'Minhas compras' }}
      />
      <AuthStack.Screen
        name="GroceryList"
        component={GroceryList}
        options={{ ...headerOptions, headerTitle: 'Lista' }}
      />
      <AuthStack.Screen
        name="Profile"
        component={Profile}
        options={{ ...headerOptions, headerTitle: 'Meu perfil' }}
      />
      <AuthStack.Screen
        name="About"
        component={About}
        options={{ ...headerOptions, headerTitle: 'Sobre' }}
      />
    </AuthStack.Navigator>
  );
}
