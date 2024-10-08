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
import { useUserHook } from "../api/user/user";

const SignUp = () => {
    const { signUpUser } = useUserHook();
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
    const [isIDValid, setIsIDValid] = useState(false); // 아이디 유효성 상태
    const [idMessage, setIdMessage] = useState(""); // 아이디 유효성 메시지
    const [password, setPassword] = useState(""); // 비밀번호
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 보이기 여부
    const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 상태
    const [passwordMessage, setPasswordMessage] = useState(""); // 비밀번호 유효성 메시지
    const [guardianName, setGuardianName] = useState(""); // 보호자 이름
    const [phoneNumber, setPhoneNumber] = useState(""); // 보호자 전화번호
    const [targetName, setTargetName] = useState(""); // 대상자 이름
    const [gender, setGender] = useState(null); // 대상자 성별
    const [age, setAge] = useState(""); // 대상자 나이
    const [pressedDisability, setPressedDisability] = useState([]); // 대상자 장애 유형
    const [disabilityGrade, setDisabilityGrade] = useState(null); // 대상자 장애 등급
    const [specialNote, setSpecialNote] = useState(""); // 특이사항
    const [requireNote, setRequireNote] = useState(""); // 요청사항
    const [inputHeight, setInputHeight] = useState(80); // 텍스트 창의 높이 조절
    const [isCompleteEnabled, setIsCompleteEnabled] = useState(false); // 회원가입 하기 버튼 활성화 상태

    const checkButtonEnabled = () => {
        if (
            ID.trim() !== "" &&
            ID.length >= 3 &&
            password.trim() !== "" &&
            guardianName.trim() !== "" &&
            phoneNumber.trim() !== "" &&
            targetName.trim() !== "" &&
            gender !== null &&
            age.trim() !== "" &&
            pressedDisability.length > 0 &&
            disabilityGrade !== "" &&
            isIDValid &&
            isPasswordValid
        ) {
            setIsCompleteEnabled(true);
        } else {
            setIsCompleteEnabled(false);
        }
    };

    useEffect(() => {
        checkButtonEnabled();
    }, [ID, password, guardianName, phoneNumber, targetName, gender, age, pressedDisability, disabilityGrade]);

    const handleFocus = (index) => {
        inputRefs.current[index].measureLayout(scrollViewRef.current, (x, y) => {
            scrollViewRef.current.scrollTo({ y: y - 20, animated: true });
        });
    };

    const filterLowercaseEnglishAndNumbers = (text) => {
        return text.replace(/[^a-z0-9]/g, "");
    };

    const filterKoreanEnglish = (text) => {
        return text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]/g, "");
    };

    const handleIDChange = (text) => {
        const filteredText = filterLowercaseEnglishAndNumbers(text);
        if (filteredText.length <= 12) {
            setID(filteredText);
            if (filteredText.length >= 3 && filteredText.length <= 12) {
                setIsIDValid(true);
                setIdMessage("사용 가능한 아이디입니다.");
            } else {
                setIsIDValid(false);
                setIdMessage("사용 불가능한 아이디입니다.");
            }
        } else {
            setIsIDValid(false);
            setIdMessage("사용 불가능한 아이디입니다.");
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.length >= 6 && text.length <= 20) {
            setIsPasswordValid(true);
            setPasswordMessage("사용 가능한 비밀번호입니다.");
        } else {
            setIsPasswordValid(false);
            setPasswordMessage("비밀번호는 6자에서 20자 사이여야 합니다.");
        }
    };

    const handleGuardianNameChange = (text) => {
        const filteredText = filterKoreanEnglish(text);
        setGuardianName(filteredText);
    };

    const handleTargetNameChange = (text) => {
        const filteredText = filterKoreanEnglish(text);
        setTargetName(filteredText);
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
            const disabledTypes = pressedDisability.map((type) => ({
                disabledType: type,
            }));

            const userData = {
                userLoginId: ID,
                userPassword: password,
                userName: guardianName,
                userNumber: phoneNumber,
                patientAge: age,
                patientSex: gender === "남성" ? "M" : "F",
                patientName: targetName,
                disabledGrade: disabilityGrade,
                significant: specialNote,
                requirement: requireNote,
                disabledTypes: disabledTypes,
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
                        onChangeText={handleIDChange}
                        autoCapitalize='none'
                        keyboardType='default'
                        onFocus={() => handleFocus(0)}
                        ref={(el) => (inputRefs.current[0] = el)}
                    />
                    <Text
                        style={{
                            color: isIDValid ? "green" : "red",
                            marginTop: 5,
                            marginBottom: -15,
                            fontSize: 12,
                        }}
                    >
                        {idMessage}
                    </Text>
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>비밀번호</Text>
                    <View style={Styles.PasswordContainer}>
                        <TextInput
                            style={Styles.PasswordInput}
                            placeholder='사용하실 비밀번호를 입력해주세요'
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={handlePasswordChange}
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
                    <Text
                        style={{
                            color: isPasswordValid ? "green" : "red",
                            marginTop: 5,
                            marginBottom: -15,
                            fontSize: 12,
                        }}
                    >
                        {passwordMessage}
                    </Text>
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>보호자 성명</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='보호자 성명을 입력해주세요'
                        value={guardianName}
                        onChangeText={handleGuardianNameChange}
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
                        onChangeText={handleTargetNameChange}
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
                            <Text
                                style={[
                                    Styles.GenderButtonText,
                                    gender == "남성"
                                        ? Styles.GenderButtonTextPressed
                                        : Styles.GenderButtonTextNotPressed,
                                ]}
                            >
                                남성
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.GenderButton, gender === "여성" && Styles.GenderButtonSelected]}
                            onPress={() => setGender("여성")}
                        >
                            <Text
                                style={[
                                    Styles.GenderButtonText,
                                    gender == "여성"
                                        ? Styles.GenderButtonTextPressed
                                        : Styles.GenderButtonTextNotPressed,
                                ]}
                            >
                                여성
                            </Text>
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
                                        <Text
                                            style={[
                                                Styles.ButtonText,
                                                isPressed ? Styles.ButtonTextPressed : Styles.ButtonTextNotPressed,
                                            ]}
                                        >
                                            {button.label}
                                        </Text>
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
        paddingTop: StatusBar.currentHeight || 10,
        backgroundColor: "white",
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
        backgroundColor: "white",
    },

    GenderButtonSelected: {
        backgroundColor: "#4CAF50",
    },

    GenderButtonText: {
        color: "#000",
    },

    GenderButtonTextPressed: {
        color: "white",
    },

    GenderButtonTextNotPressed: {
        color: "black",
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
        backgroundColor: "white",
    },

    ButtonPressed: {
        backgroundColor: "#4CAF50",
    },

    ButtonNotPressed: {
        backgroundColor: "white",
    },

    ButtonText: {
        fontSize: 16,
        textAlign: "center",
    },

    ButtonTextPressed: {
        color: "white",
    },

    ButtonTextNotPressed: {
        color: "black",
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
