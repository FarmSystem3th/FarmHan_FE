import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;
