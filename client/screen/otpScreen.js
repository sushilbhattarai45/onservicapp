import { React, useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Colors } from "../styles/main";
export default function OtpScreen() {
  return (
    <View style={{ margin: 30 }}>
      <Text
        style={{
          marginTop: 50,
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: 20,
          lineHeight: 38,
          display: "flex",
          alignItems: "flex-end",
          letterS: -0.02,

          color: Colors.black,
        }}
      >
        Enter Your OTP
      </Text>

      <Text
        styles={{
          color: Colors.gray500,
          fontSize: 12,
        }}
      >
        We have sent an OTP to the number +977-9800000000
      </Text>
    </View>
  );
}
