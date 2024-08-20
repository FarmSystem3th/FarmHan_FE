import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>SignUp Page</Text>
        </View>
    );
};

export default SignUp;
