import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const CallHistory = ({ route }) => {
    const { callHistoryList } = route.params;

    const renderItem = ({ item }) => (
        <>
            <View style={Styles.AnswerContainer}>
                <Text style={Styles.AnswerText}>{item.message_answer}</Text>
                <Text style={Styles.TimeStamp}>{item.createAt}</Text>
            </View>

            <View style={Styles.QuestionContainer}>
                <Text style={Styles.QuestionText}>{item.message_question}</Text>
                <Text style={Styles.TimeStamp}>{item.createAt}</Text>
            </View>
        </>
    );

    return (
        <View style={Styles.Container}>
            <FlatList
                data={callHistoryList}
                keyExtractor={(item) => item.callHistoryId.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 20 }}
                inverted={true}
            />
        </View>
    );
};

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingBottom: 50,
    },
    QuestionContainer: {
        alignSelf: "flex-end",
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        maxWidth: "80%",
    },
    QuestionText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    AnswerContainer: {
        alignSelf: "flex-start",
        backgroundColor: "#dcdcdc",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        maxWidth: "80%",
    },
    AnswerText: {
        color: "#000",
        fontSize: 16,
    },
    TimeStamp: {
        fontSize: 12,
        color: "#000",
        marginTop: 5,
        alignSelf: "flex-start",
    },
});

export default CallHistory;
