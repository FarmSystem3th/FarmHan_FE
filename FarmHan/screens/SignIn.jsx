import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
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
