import * as Notifications from "expo-notifications";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
    // 푸쉬 알림 테스트 코드
    const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "알림 제목 테스트입니다.",
                body: "알림 내용 테스트입니다.",
            },
            trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정(시간을 지정하고 싶으면 숫자를 입력 => ex. 5분 == 300)
            repeats: false, // 알림이 반복되지 않도록 설정
        });
    };

    useEffect(() => {
        sendNotification();

        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            // 푸쉬 알림이 수신된 경우 이를 처리하는 코드
            console.log("알림 전송 완료", notification);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // SignIn 화면에 들어오면 자동으로 푸쉬 알림이 발송됩니다.

    const navigation = useNavigation();

    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        if (id === "" || password === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        if (id === "admin" && password === "admin") {
            navigation.navigate("Main", { screen: "Main" });
            console.log(id, password);
            return;
        } else {
            alert("아이디와 비밀번호를 확인해주세요.");
            return;
        }
    };

    return (
        <View>
            <View style={Styles.loginContainer}>
                <View style={Styles.textContainer}>
                    <TextInput placeholder='아이디' value={id} onChangeText={setId} style={Styles.input} />
                </View>
                <View style={Styles.textContainer}>
                    <TextInput
                        placeholder='비밀번호'
                        value={password}
                        onChangeText={setPassword}
                        style={Styles.input}
                    />
                </View>
            </View>

            <View style={Styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleLogin} style={Styles.SampleButton}>
                    <Text>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("회원가입", { screen: "SignUp" })}
                    style={Styles.SampleButton}
                >
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignIn;

const Styles = StyleSheet.create({
    SampleButton: {
        backgroundColor: "green",
        padding: 10,
        marginTop: "20%",
        width: "20%",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "20%",
    },
    loginContainer: {
        marginTop: "50%",
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
    },
});
