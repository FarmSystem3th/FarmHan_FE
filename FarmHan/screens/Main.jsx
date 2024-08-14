import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Main</Text>
    </View>
  );
};

export default Main;
