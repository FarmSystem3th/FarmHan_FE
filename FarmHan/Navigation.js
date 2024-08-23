import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./screens/Main";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import MyPage from "./screens/MyPage";
import List from "./screens/List";

const Stack = createStackNavigator();

function StackScreen() {
    return (
        <Stack.Navigator initialRouteName='로그인'>
            <Stack.Screen name='로그인' component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name='회원가입' component={SignUp} />
            <Stack.Screen name='메인' component={Main} options={{ headerShown: false }} />
            <Stack.Screen name='마이페이지' component={MyPage} />
            <Stack.Screen name='채팅리스트' component={List} />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    // 푸쉬 알림 권한 설정
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                alert("알림 권한이 거부되었습니다!");
            }
        })();
    }, []);

    return (
        <NavigationContainer>
            <StackScreen />
        </NavigationContainer>
    );
};

export default Navigation;
