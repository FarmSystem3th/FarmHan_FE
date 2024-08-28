import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserHook } from "../../api/user/user";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../recoil/user/userRecoilState";

const CallList = () => {
    const { callListUser } = useUserHook();
    const userId = useRecoilValue(userIdState);

    const navigation = useNavigation();

    const [callData, setCallData] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    };

    const transformResponseData = (responseDto) => {
        return responseDto.callHistory.map((call) => ({
            callId: call.callId.toString(),
            createAt: formatDate(call.createAt),
            callHistoryList: call.callHistoryList.map((history) => ({
                callHistoryId: history.callHistoryId,
                createAt: formatDate(history.createAt),
                message_answer: history.message_answer,
                message_question: history.message_question,
            })),
        }));
    };

    useEffect(() => {
        const fetchCallData = async () => {
            try {
                const data = await callListUser(userId);
                const transformedData = await transformResponseData(data.responseDto);
                setCallData(transformedData);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCallData();
    }, []);

    const handleCallPress = (call) => {
        navigation.navigate("대화 상세 내용", { callHistoryList: call.callHistoryList });
    };

    if (loading) {
        return (
            <View style={Styles.LoadingContainer}>
                <ActivityIndicator size='large' color='#4CAF50' />
            </View>
        );
    }

    return (
        <View style={Styles.Container}>
            <FlatList
                data={callData}
                keyExtractor={(item) => item.callId}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCallPress(item)} style={Styles.ListItem}>
                        <Text style={Styles.Title}>통화 시간</Text>
                        <Text style={Styles.Label}>{item.createAt}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 20,
    },
    ListItem: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    Title: {
        fontSize: 16,
        marginBottom: 5,
    },

    Label: {
        fontSize: 18,
        fontWeight: "bold",
    },
    TimeStamp: {
        fontSize: 14,
        color: "#555",
    },

    LoadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CallList;
