import {View, Text, Button, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Voice from "@react-native-voice/voice";
import * as Speech from 'expo-speech';

const Main = () => {
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [finalText, setFinalText] = useState("");
  const resultsRef = useRef([]);

  const exampleText = "예시 답변";

  useEffect(() => {
    Voice.onSpeechPartialResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    resultsRef.current = event.value;
  };

  const onSpeechEnd = () => {
    console.log("음성 인식 종료:", resultsRef.current);
    setFinalText(resultsRef.current.join(" "));
    setIsRecording(false);
  };

  const startSpeechToText = async () => {
    console.log("start");
    try {
      resultsRef.current = [];
      setFinalText("");
      setIsRecording(true);
      await Voice.start("ko-KR");
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  const stopSpeechToText = async () => {
    console.log("stop");
    try {
      setIsRecording(false);
      await Voice.stop();
      // setFinalText(resultsRef.current.join(" "));
      // console.log("음성 인식 종료:", resultsRef.current);
    } catch (e) {
      console.error(e);
    }
  };

  const speak = () => {
    console.log('speak');
    Speech.speak(exampleText, {
      language: 'ko',
      pitch: 1.0,
      rate: 1.0,
    });
  };

  return (
    <View style={Styles.mainSection}>
      <View style={Styles.inputSection}>
        <View style={[Styles.borderedSection, { flex: 1 }]}>
          <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContent}>
            <View style={Styles.textSection}>
              <Text style={Styles.textStyle}>인식된 텍스트: {finalText}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isRecording ? stopSpeechToText : startSpeechToText}
          style={Styles.SampleButton}
          disabled={!Voice.isAvailable()}
        >
          <Text>{isRecording ? "대화 중지" : "대화 시작"}</Text>
        </TouchableOpacity>
      </View>

      <View style={Styles.responseSection}>
        <View style={[Styles.borderedSection, { flex: 1 }]}>
          <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContent}>
            <View style={Styles.textSection}>
              <Text style={Styles.textStyle}>답변 내용: {exampleText}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={speak}
          style={Styles.SampleButton}
        >
          <Text>답변</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.buttonSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.SampleButton}
          onPress={() => navigation.navigate("마이페이지", { screen: "MyPage" })}
        >
          <Text>마이페이지</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.SampleButton}
          onPress={() => navigation.navigate("채팅리스트", { screen: "List" })}
        >
          <Text>채팅리스트</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const Styles = StyleSheet.create({
  mainSection: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 30,
  },
  inputSection: {
    flex: 1,
  },
  textSection: {
    display: "flex",
    flex: 1,
    padding: 10,
  },
  borderedSection: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 10,
  },
  textStyle: {
    fontSize: 20,
  },
  buttonSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  SampleButton: {
    backgroundColor: "green",
    padding: 10,
    width: "25%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 10,
  },
  responseSection: {
    flex: 1,
  },
})