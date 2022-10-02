import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import { GoogleFonts } from "next-google-fonts";
import CategoryPersonListingScreen from "./screen/categoryPersonListingScreen";
import LoginsScreen from "./screen/Auth/loginsScreen";
import SignUpScreen from "./screen/Auth/signUpScreen";
import OtpScreen from "./screen/Auth/otpScreen";
import createNewPinScreen from "./screen/Auth/createNewPinScreen";
import CreateNewPinScreen from "./screen/Auth/createNewPinScreen";
import ForgetPinScreen from "./screen/Auth/forgetPinScreen";
export default function App() {
  return (
    <View>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap" />
      <ForgetPinScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  ThemeLightComponentSongsCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(249,249,252,1)",
    width: 426,
    height: 77,
  },
  MaskGroup: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 20,
  },
  AutoLayoutVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    width: 318,
  },
  Txt748: {
    fontSize: 18,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33,33,33,1)",
    width: 319,
  },
});
