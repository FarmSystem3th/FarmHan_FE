import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const List = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>List</Text>
        </View>
    );
};

export default List;
