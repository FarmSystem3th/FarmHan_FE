import * as Notifications from "expo-notifications";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {useUserHook} from "../api/user/user";
import {userIdState} from "../recoil/user/userRecoilState";

const SignIn = () => {
    // // 푸쉬 알림 테스트 코드
    // const sendNotification = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "알림 제목 테스트입니다.",
    //             body: "알림 내용 테스트입니다.",
    //         },
    //         trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정(시간을 지정하고 싶으면 숫자를 입력 => ex. 5분 == 300)
    //         repeats: false, // 알림이 반복되지 않도록 설정
    //     });
    // };

    // useEffect(() => {
    //     sendNotification();

    //     const subscription = Notifications.addNotificationReceivedListener((notification) => {
    //         // 푸쉬 알림이 수신된 경우 이를 처리하는 코드
    //         console.log("알림 전송 완료", notification);
    //     });

    //     return () => {a
    //         subscription.remove();
    //     };
    // }, []);

    // // SignIn 화면에 들어오면 자동으로 푸쉬 알림이 발송됩니다.

    const navigation = useNavigation();

    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { loginUser } = useUserHook();

    const handleLogin = async () => {
        if (id === "" || password === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        } else {
            const loginSuccess = await loginUser(id, password);

            if (loginSuccess) {
                navigation.navigate("메인", { screen: "Main" });
            } else {
                alert("아이디와 비밀번호를 확인해주세요.");
                return;
            }
        }
    };

    return (
        <View>
            <View style={Styles.LogoContainer}>
                <Image source={require("../assets/images/Main-Logo.png")} style={Styles.ImageWrapper} />
            </View>
            <View style={Styles.loginContainer}>
                <View style={Styles.textContainer}>
                    <TextInput placeholder='아이디' value={id} onChangeText={setId} style={Styles.input} />
                </View>
                <View style={Styles.textContainer}>
                    <View style={Styles.PasswordContainer}>
                        <TextInput
                            style={Styles.PasswordInput}
                            placeholder='비밀번호'
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={Styles.ShowPasswordButton}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Text style={Styles.ShowPasswordButtonLabel}>
                                {isPasswordVisible ? "숨기기" : "보이기"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={Styles.ButtonContainer}>
                <TouchableOpacity style={Styles.LoginButton} onPress={handleLogin}>
                    <Text style={Styles.LoginLabel}>로그인</Text>
                </TouchableOpacity>
                <View style={Styles.SignUpContainer}>
                    <Text style={Styles.SignUpLabel}>아직 회원이 아니신가요?</Text>
                    <TouchableOpacity
                        style={Styles.SignUpButton}
                        onPress={() => navigation.navigate("회원가입", { screen: "SignUp" })}
                    >
                        <Text style={Styles.SignUpButtonLabel}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignIn;

const Styles = StyleSheet.create({
    LogoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40%",
    },

    ImageWrapper: {
        width: 256,
        height: 256,
    },

    ButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    LoginButton: {
        width: "80%",
        height: 50,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#4CAF50",
    },

    LoginLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    loginContainer: {
        marginTop: "10%",
        width: "100%",
        flexDirection: "column",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },

    PasswordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: "80%",
    },

    PasswordInput: {
        flex: 1,
        height: 40,
    },

    ShowPasswordButton: {
        marginLeft: 10,
    },

    ShowPasswordButtonLabel: {
        color: "#4CAF50",
        fontSize: 14,
    },

    SignUpContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    SignUpLabel: {
        color: "black",
        fontSize: 15,
    },

    SignUpButton: {
        marginLeft: 8,
    },

    SignUpButtonLabel: {
        color: "#4CAF50",
        fontSize: 15,
        textDecorationLine: "underline",
    },
});
