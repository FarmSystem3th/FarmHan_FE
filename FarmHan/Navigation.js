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
        <Stack.Navigator initialRouteName='로그인'>
            <Stack.Screen name='로그인' component={SignIn} />
            <Stack.Screen name='회원가입' component={SignUp} />
            <Stack.Screen name='메인' component={Main} />
            <Stack.Screen name='마이페이지' component={MyPage} />
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
