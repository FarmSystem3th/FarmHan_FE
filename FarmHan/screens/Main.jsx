import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";
import { useRecoilState, useRecoilValue } from "recoil";
import { callIdState, userIdState } from "../recoil/user/userRecoilState";
import { useUserHook } from "../api/user/user";

const Main = () => {
    const navigation = useNavigation();
    const [isRecording, setIsRecording] = useState(false);
    const [finalText, setFinalText] = useState("");
    const resultsRef = useRef([]);
    const [callId, setCallId] = useRecoilState(callIdState);
    const userId = useRecoilValue(userIdState);

    const [isCallActive, setIsCallActive] = useState(false);

    const placeholderConverSation = "인식된 음성이 텍스트로 출력됩니다.";
    const placeholderAnswer = "AI의 답변이 텍스트로 출력됩니다.";

    const [answerText, setAnswerText] = useState("");
    const { callStart, callIng } = useUserHook();

    useEffect(() => {
        Voice.onSpeechPartialResults = onSpeechResults;
        Voice.onSpeechEnd = onSpeechEnd;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechResults = (event) => {
        resultsRef.current = event.value;
    };

    const onSpeechEnd = () => {
        console.log("음성 인식 종료:", resultsRef.current);
        setFinalText(resultsRef.current.join(" "));
        setIsRecording(false);
    };

    const startSpeechToText = async () => {
        console.log("start");
        try {
            resultsRef.current = [];
            setFinalText("");
            setIsRecording(true);
            await Voice.start("ko-KR");
        } catch (e) {
            console.error(e);
            setIsRecording(false);
        }
    };

    const stopSpeechToText = async () => {
        console.log("stop");
        try {
            setIsRecording(false);
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    const speak = () => {
        console.log("speak");
        Speech.speak(answerText, {
            language: "ko",
            pitch: 1.0,
            rate: 1.0,
        });
    };

    const stopCall = () => {
        setCallId(null);
        setFinalText("");
        setAnswerText("");
        setIsCallActive(false);
    };

    const startCall = async () => {
        setIsCallActive(true);
        await callStart(userId);
    };

    useEffect(() => {
        if (callId && finalText) {
            console.log(finalText);
            const fetchAnswer = async () => {
                console.log(callId);
                const answer = await callIng(userId, finalText, callId);
                setAnswerText(answer);
                console.log("대화중:", answer);
            };

            fetchAnswer();
        }
    }, [finalText]);

    return (
        <View style={Styles.mainSection}>
            <View style={Styles.OptionSection}>
                <TouchableOpacity
                    style={Styles.OptionButton}
                    onPress={() => navigation.navigate("마이페이지", { screen: "MyPage" })}
                >
                    <Text style={Styles.OptionButtonLabel}>마이페이지</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.OptionButton}
                    onPress={() => navigation.navigate("대화 목록", { screen: "CallList" })}
                >
                    <Text style={Styles.OptionButtonLabel}>대화 목록</Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.inputSection}>
                <View style={[Styles.borderedSection, { flex: 1 }]}>
                    <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContent}>
                        <View style={Styles.textSection}>
                            <Text style={[Styles.textStyle, finalText === "" && Styles.placeholder]}>
                                {finalText !== "" ? finalText : placeholderConverSation}
                            </Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={Styles.ButtonContainer}>
                    <TouchableOpacity
                        style={[
                            Styles.ButtonWrapper,
                            isRecording ? Styles.ChatQuitButtonWrapper : Styles.ChatStartButtonWrapper,
                            !isCallActive && Styles.ButtonDisabled,
                        ]}
                        onPress={isRecording ? stopSpeechToText : startSpeechToText}
                        disabled={!isCallActive || !Voice.isAvailable()}
                    >
                        <Text style={Styles.ButtonLabel}>{isRecording ? "대화 중지" : "대화 시작"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.responseSection}>
                <View style={[Styles.borderedSection, { flex: 1 }]}>
                    <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContent}>
                        <View style={Styles.textSection}>
                            <Text style={[Styles.textStyle, answerText === "" && Styles.placeholder]}>
                                {answerText !== "" ? answerText : placeholderAnswer}
                            </Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={Styles.ButtonContainer}>
                    <TouchableOpacity
                        style={[Styles.ButtonWrapper, !isCallActive && Styles.ButtonDisabled]}
                        onPress={speak}
                        disabled={!isCallActive}
                    >
                        <Text style={Styles.ButtonLabel}>음성으로 답변 듣기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.ButtonContainer}>
                <TouchableOpacity
                    style={[
                        Styles.ButtonWrapper,
                        callId ? Styles.CallQuitButtonWrapper : Styles.CallStartButtonWrapper,
                    ]}
                    onPress={callId ? stopCall : startCall}
                >
                    <Text style={Styles.CallButtonLabel}>{callId ? "통화 종료" : "통화 시작"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Main;

const Styles = StyleSheet.create({
    mainSection: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: 30,
        paddingTop: 100,
        paddingBottom: 90,
    },
    inputSection: {
        flex: 1,
    },
    textSection: {
        display: "flex",
        flex: 1,
        padding: 10,
    },
    borderedSection: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        margin: 10,
    },
    textStyle: {
        fontSize: 18,
    },

    placeholder: {
        color: "#aaa",
    },

    OptionSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: -20,
    },

    OptionButton: {
        width: "45%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#4CAF50",
    },

    OptionButtonLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    ButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: -20,
    },

    ButtonWrapper: {
        width: "95%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#4CAF50",
    },

    ButtonDisabled: {
        backgroundColor: "#888",
    },

    ChatStartButtonWrapper: {
        backgroundColor: "#4CAF50",
    },

    ChatQuitButtonWrapper: {
        backgroundColor: "#ff3838",
    },

    CallStartButtonWrapper: {
        width: "60%",
        height: 50,
        backgroundColor: "#4CAF50",
        borderRadius: 30,
    },

    CallQuitButtonWrapper: {
        width: "60%",
        height: 50,
        backgroundColor: "#ff3838",
        borderRadius: 30,
    },

    ButtonLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    CallButtonLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 10,
    },
    responseSection: {
        flex: 1,
    },
});
