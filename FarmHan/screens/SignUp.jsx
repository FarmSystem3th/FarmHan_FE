import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>SignUp</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("SignIn", { screen: "SignIn" })}
        style={Styles.SampleButton}
      >
        <Text>회원가입으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  SampleButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: "20%",
    width: "20%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
