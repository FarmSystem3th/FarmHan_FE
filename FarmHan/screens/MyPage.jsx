import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const MyPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>MyPage</Text>
    </View>
  );
};

export default MyPage;
