import {
    View,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { signUpUser } from "../api/user/signUpUser";

const SignUp = () => {
    const navigation = useNavigation();

    const scrollViewRef = useRef(null);
    const inputRefs = useRef([]);

    const disabilityData = [
        { id: "지체장애", label: "지체장애" },
        { id: "뇌병변장애", label: "뇌병변장애" },
        { id: "시각장애", label: "시각장애" },
        { id: "청각장애", label: "청각장애" },
        { id: "언어장애", label: "언어장애" },
        { id: "안면장애", label: "안면장애" },
        { id: "신장장애", label: "신장장애" },
        { id: "심장장애", label: "심장장애" },
        { id: "간장애", label: "간장애" },
        { id: "호흡기장애", label: "호흡기장애" },
        { id: "장루, 요루장애", label: "장루, 요루장애" },
        { id: "간질장애", label: "간질장애" },
        { id: "지적장애", label: "지적장애" },
        { id: "자폐성장애", label: "자폐성장애" },
        { id: "정신장애", label: "정신장애" },
    ];

    const [ID, setID] = useState(""); // 아이디
    const [password, setPassword] = useState(""); // 비밀번호
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 보이기 여부
    const [guardianName, setGuardianName] = useState(""); // 보호자 이름
    const [phoneNumber, setPhoneNumber] = useState(""); // 보호자 전화번호
    const [targetName, setTargetName] = useState(""); // 대상자 이름
    const [gender, setGender] = useState(null); // 대상자 성별
    const [age, setAge] = useState(""); // 대상자 나이
    const [pressedDisability, setPressedDisability] = useState([]); // 대상자 장애 유형
    const [disabilityGrade, setDisabilityGrade] = useState("1"); // 대상자 장애 등급
    const [specialNote, setSpecialNote] = useState(""); // 특이사항
    const [requireNote, setRequireNote] = useState(""); // 요청사항
    const [inputHeight, setInputHeight] = useState(80); // 텍스트 창의 높이 조절
    const [isCompleteEnabled, setIsCompleteEnabled] = useState(false); // 회원가입 하기 버튼 활성화 상태

    const checkButtonEnabled = () => {
        if (
            ID.trim() !== "" &&
            password.trim() !== "" &&
            guardianName.trim() !== "" &&
            phoneNumber.trim() !== "" &&
            targetName.trim() !== "" &&
            gender !== null &&
            age.trim() !== "" &&
            disabilityGrade !== ""
        ) {
            setIsCompleteEnabled(true);
        } else {
            setIsCompleteEnabled(false);
        }
    };

    useEffect(() => {
        checkButtonEnabled();
    }, [ID, password, guardianName, phoneNumber, targetName, gender, age, disabilityGrade]);

    const handleFocus = (index) => {
        inputRefs.current[index].measureLayout(scrollViewRef.current, (x, y) => {
            scrollViewRef.current.scrollTo({ y: y - 20, animated: true });
        });
    };

    const formatPhoneNumber = (text) => {
        const cleaned = ("" + text).replace(/\D/g, "");
        if (cleaned.length > 11) return;

        let formatted = cleaned;
        if (cleaned.length > 3 && cleaned.length <= 7) {
            formatted = cleaned.slice(0, 3) + "-" + cleaned.slice(3);
        } else if (cleaned.length > 7) {
            formatted = cleaned.slice(0, 3) + "-" + cleaned.slice(3, 7) + "-" + cleaned.slice(7);
        }

        setPhoneNumber(formatted);
    };

    const handleAgeChange = (text) => {
        const numericValue = parseInt(text.replace(/[^0-9]/g, ""), 10);

        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
            setAge(numericValue.toString());
        } else if (text === "") {
            setAge("");
        }
    };

    const handleDisabilityPress = (id) => {
        setPressedDisability((prev) => {
            if (prev.includes(id)) {
                return prev.filter((buttonId) => buttonId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSignUp = async () => {
        if (isCompleteEnabled) {
            // pressedDisability 배열을 disabledTypes 형식으로 변환
            const disabledTypes = pressedDisability.map((type) => ({
                disabledType: type,
            }));

            // userData를 서버에서 요구하는 양식에 맞게 작성
            const userData = {
                userLoginId: ID,
                userPassword: password,
                userName: guardianName, // 보호자의 이름을 userName으로 설정
                userNumber: phoneNumber,
                patientAge: age,
                patientSex: gender === "남성" ? "M" : "F", // 성별을 M 또는 F로 설정
                patientName: targetName, // 대상자의 이름을 patientName으로 설정
                disabledGrade: disabilityGrade,
                significant: specialNote, // 특이사항을 significant로 설정
                requirement: requireNote, // 요청사항을 requirement로 설정
                disabledTypes: disabledTypes, // 장애 유형 리스트
            };

            try {
                const response = await signUpUser(userData);
                console.log("회원가입 성공", response.data);
                navigation.navigate("메인", { screen: "Main" });
            } catch (error) {
                console.error("회원가입 실패", error);
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={Styles.Container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={Styles.ScrollViewContent}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
            >
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>아이디</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='사용하실 아이디를 입력해주세요'
                        value={ID}
                        onChangeText={setID}
                        onFocus={() => handleFocus(0)}
                        ref={(el) => (inputRefs.current[0] = el)}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>비밀번호</Text>
                    <View style={Styles.PasswordContainer}>
                        <TextInput
                            style={Styles.PasswordInput}
                            placeholder='사용하실 비밀번호를 입력해주세요'
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => handleFocus(1)}
                            ref={(el) => (inputRefs.current[1] = el)}
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
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>보호자 성명</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='보호자 성명을 입력해주세요'
                        value={guardianName}
                        onChangeText={setGuardianName}
                        onFocus={() => handleFocus(2)}
                        ref={(el) => (inputRefs.current[2] = el)}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>보호자 휴대전화</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='보호자 전화번호를 입력해주세요'
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={formatPhoneNumber}
                        onFocus={() => handleFocus(3)}
                        ref={(el) => (inputRefs.current[3] = el)}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>대상자 성명</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='대상자 성명을 입력해주세요'
                        value={targetName}
                        onChangeText={setTargetName}
                        onFocus={() => handleFocus(4)}
                        ref={(el) => (inputRefs.current[4] = el)}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>대상자 성별</Text>
                    <View style={Styles.GenderContainer}>
                        <TouchableOpacity
                            style={[Styles.GenderButton, gender === "남성" && Styles.GenderButtonSelected]}
                            onPress={() => setGender("남성")}
                        >
                            <Text style={Styles.GenderButtonText}>남성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.GenderButton, gender === "여성" && Styles.GenderButtonSelected]}
                            onPress={() => setGender("여성")}
                        >
                            <Text style={Styles.GenderButtonText}>여성</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>대상자 나이</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='나이를 입력해주세요'
                        keyboardType='numeric'
                        value={age}
                        onChangeText={handleAgeChange}
                        maxLength={3}
                        onFocus={() => handleFocus(5)}
                        ref={(el) => (inputRefs.current[5] = el)}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>장애 유형</Text>
                    <View style={Styles.ButtonContainer}>
                        <View style={Styles.Grid}>
                            {disabilityData.map((button) => {
                                const isPressed = pressedDisability.includes(button.id);

                                return (
                                    <TouchableOpacity
                                        key={button.id}
                                        style={[
                                            Styles.Button,
                                            isPressed ? Styles.ButtonPressed : Styles.ButtonNotPressed,
                                        ]}
                                        onPress={() => handleDisabilityPress(button.id)}
                                    >
                                        <Text style={Styles.ButtonText}>{button.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>장애 등급</Text>
                    <View style={Styles.PickerContainer}>
                        <RNPickerSelect
                            value={disabilityGrade}
                            onValueChange={(value) => setDisabilityGrade(value)}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "등급을 선택하세요", value: null }}
                            items={[
                                { label: "1급", value: "1" },
                                { label: "2급", value: "2" },
                                { label: "3급", value: "3" },
                                { label: "4급", value: "4" },
                                { label: "5급", value: "5" },
                                { label: "6급", value: "6" },
                            ]}
                        />
                    </View>
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>특이사항</Text>
                    <TextInput
                        style={[Styles.TextArea, { height: Math.max(80, inputHeight) }]}
                        placeholder='특이사항을 입력해주세요'
                        value={specialNote}
                        onChangeText={setSpecialNote}
                        multiline={true}
                        onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                        onFocus={() => handleFocus(6)}
                        ref={(el) => (inputRefs.current[6] = el)}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>요청사항</Text>
                    <TextInput
                        style={[Styles.TextArea, { height: Math.max(80, inputHeight) }]}
                        placeholder='요청사항을 입력해주세요'
                        value={requireNote}
                        onChangeText={setRequireNote}
                        multiline={true}
                        onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                        onFocus={() => handleFocus(7)}
                        ref={(el) => (inputRefs.current[7] = el)}
                    />
                </View>
                <View style={Styles.ButtonContainer}>
                    <TouchableOpacity
                        style={[
                            Styles.CompleteButton,
                            isCompleteEnabled ? Styles.ButtonEnabled : Styles.ButtonDisabled,
                        ]}
                        onPress={handleSignUp}
                        disabled={!isCompleteEnabled}
                    >
                        <Text style={Styles.CompleteLabel}>회원가입 하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight || 10,
    },

    ScrollViewContent: {
        paddingHorizontal: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        paddingBottom: 80,
    },

    InputContainer: {
        marginBottom: 25,
    },

    PasswordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
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

    Label: {
        fontSize: 14,
        marginBottom: 5,
    },

    Input: {
        borderColor: "gray",
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 5,
    },

    GenderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    GenderButton: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginHorizontal: 2,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },

    GenderButtonSelected: {
        backgroundColor: "#4CAF50",
    },

    GenderButtonText: {
        color: "#000",
    },

    ButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    Grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 1200,
    },

    Button: {
        width: 90,
        height: 50,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },

    ButtonPressed: {
        backgroundColor: "#4CAF50",
    },

    ButtonNotPressed: {
        backgroundColor: "white",
    },

    ButtonText: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
    },

    PickerContainer: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        overflow: "hidden",
    },

    TextArea: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },

    CompleteButton: {
        width: "100%",
        height: 50,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#4CAF50",
    },

    CompleteLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    ButtonEnabled: {
        backgroundColor: "#4CAF50",
    },

    ButtonDisabled: {
        backgroundColor: "#ccc",
    },
});

// Picker 스타일 지정
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 8,
        color: "black",
        paddingRight: 30,
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
    placeholder: {
        color: "gray",
    },
});

export default SignUp;
