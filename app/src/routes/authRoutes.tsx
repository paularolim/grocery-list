import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/login";
import { Register } from "../screens/register";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  const headerOptions = {
    headerTitle: "Meu mercado",
    headerStyle: { backgroundColor: "rgb(248, 110, 69)" },
    headerTintColor: "rgb(255, 255, 255)",
    headerTitleAlign: "center",
  };

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} options={headerOptions} />
      <AuthStack.Screen name="Register" component={Register} options={headerOptions} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
