import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CallList = () => {
    const navigation = useNavigation();

    const [callData, setCallData] = useState([]);
    const [loading, setLoading] = useState(true);

    const tempCallData = [
        {
            callId: "1",
            createAt: "2024-08-27T21:00:00",
            callHistory: [
                {
                    call_history_id: 1,
                    createAt: "2024-08-27T21:05:00",
                    message_answer: "아니요. 위험한 행동이니 하시면 안됩니다.",
                    message_question: "계란 자체를 전자레인지에 넣어도 되나요???",
                },
                {
                    call_history_id: 2,
                    createAt: "2024-08-27T21:10:00",
                    message_answer: "물이 필요합니다.",
                    message_question: "계란을 삶을 때 물이 필요한가요?",
                },
                {
                    call_history_id: 3,
                    createAt: "2024-08-27T21:10:00",
                    message_answer: "물이 필요합니다.",
                    message_question: "계란을 삶을 때 물이 필요한가요?",
                },
                {
                    call_history_id: 4,
                    createAt: "2024-08-27T21:10:00",
                    message_answer: "물이 필요합니다.",
                    message_question: "계란을 삶을 때 물이 필요한가요?",
                },
                {
                    call_history_id: 5,
                    createAt: "2024-08-27T21:10:00",
                    message_answer: "물이 필요합니다.",
                    message_question: "계란을 삶을 때 물이 필요한가요?",
                },
                {
                    call_history_id: 6,
                    createAt: "2024-08-27T21:10:00",
                    message_answer: "물이 필요합니다.",
                    message_question: "계란을 삶을 때 물이 필요한가요?",
                },
            ],
        },
        {
            callId: "2",
            createAt: "2024-08-22T08:00:00",
            callHistory: [
                {
                    call_history_id: 1,
                    createAt: "2024-08-22T08:05:00",
                    message_answer: "네, 할 수 있습니다.",
                    message_question: "계란 프라이는 간단한가요?",
                },
            ],
        },
    ];

    useEffect(() => {
        const fetchCallData = async () => {
            try {
                // const response = await fetch("https://example.com/api/callHistory");
                // const data = await response.json();
                setCallData(tempCallData);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCallData();
    }, []);

    const handleCallPress = (call) => {
        navigation.navigate("대화 상세 내용", { callHistory: call.callHistory });
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
