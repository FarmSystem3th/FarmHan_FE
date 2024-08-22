import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

const MyPage = () => {
    const navigation = useNavigation();

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

    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const [ID, setID] = useState(""); // 아이디
    const [password, setPassword] = useState(""); // 비밀번호
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 보이기 여부
    const [guardianName, setGuardianName] = useState(""); // 보호자 이름
    const [phoneNumber, setPhoneNumber] = useState(""); // 보호자 전화번호
    const [targetName, setTargetName] = useState(""); // 대상자 이름
    const [gender, setGender] = useState(""); // 대상자 성별
    const [age, setAge] = useState(""); // 대상자 나이
    const [pressedDisability, setPressedDisability] = useState([]); // 대상자 장애 유형
    const [disabilityGrade, setDisabilityGrade] = useState("1"); // 대상자 장애 등급
    const [specialNote, setSpecialNote] = useState(""); // 특이사항
    const [requireNote, setRequireNote] = useState(""); // 요청사항
    const [inputHeight, setInputHeight] = useState(80); // 텍스트 창의 높이 조절

    // // 서버에 response 요청 보내기
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);

    //             const response = await fetch("");
    //             if (!response.ok) {
    //                 throw new Error("데이터를 가져오는 데 실패했습니다.");
    //             }

    //             const data = await response.json();
    //             setID(data.userLoginId);
    //             setPassword(data.userPassword);
    //             setGuardianName(data.userName);
    //             setPhoneNumber(data.userNumver);
    //             setTargetName(data.patientName);
    //             setGender(data.patientSex);
    //             setAge(data.patientAge);
    //             setPressedDisability(data.disabledType);
    //             setDisabilityGrade(data.disabledGrade);
    //             setSpecialNote(data.significant);
    //             setRequireNote(data.require);

    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) {
    //     return (
    //         <View style={Styles.ExceptContainer}>
    //             <ActivityIndicator size='large' color='#0000ff' />
    //             <Text style={{ marginTop: 5 }}>데이터를 불러오는 중입니다...</Text>
    //         </View>
    //     );
    // }

    // if (error) {
    //     return (
    //         <View style={Styles.ExceptContainer}>
    //             <Text>에러가 발생했습니다: {error}</Text>
    //         </View>
    //     );
    // }

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

    return (
        <KeyboardAvoidingView
            style={Styles.Container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView contentContainerStyle={Styles.ScrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>아이디</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='사용하실 아이디를 입력해주세요'
                        value={ID}
                        onChangeText={setID}
                        editable={false}
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
                            editable={false}
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
                        editable={false}
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
                        editable={false}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>대상자 성명</Text>
                    <TextInput
                        style={Styles.Input}
                        placeholder='대상자 성명을 입력해주세요'
                        value={targetName}
                        onChangeText={setTargetName}
                        editable={false}
                    />
                </View>
                <View style={Styles.InputContainer}>
                    <Text style={Styles.Label}>대상자 성별</Text>
                    <View style={Styles.GenderContainer}>
                        <TouchableOpacity
                            style={[Styles.GenderButton, gender === "남성" && Styles.GenderButtonSelected]}
                            onPress={() => setGender("남성")}
                            disabled={true}
                        >
                            <Text style={Styles.GenderButtonText}>남성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.GenderButton, gender === "여성" && Styles.GenderButtonSelected]}
                            onPress={() => setGender("여성")}
                            disabled={true}
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
                        editable={false}
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
                                        disabled={true}
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
                            disabled={true}
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
                        editable={false}
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
                        editable={false}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const Styles = StyleSheet.create({
    ExceptContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    Container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight || 10,
    },

    ScrollViewContent: {
        paddingHorizontal: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
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

export default MyPage;
