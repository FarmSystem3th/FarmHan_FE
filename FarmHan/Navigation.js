import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./screens/Main";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import MyPage from "./screens/MyPage";

const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator initialRouteName='SignUp'>
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen name='MyPage' component={MyPage} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
