import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

import { GoogleFonts } from "next-google-fonts";
import CategoryPersonListingScreen from "./screen/categoryPersonListingScreen";
import LoginScreen from "./screen/Auth/loginsScreen";
import SignUpScreen from "./screen/Auth/signUpScreen";
import OtpScreen from "./screen/Auth/otpScreen";
import createNewPinScreen from "./screen/Auth/createNewPinScreen";
import CreateNewPinScreen from "./screen/Auth/createNewPinScreen";
import ForgetPinScreen from "./screen/Auth/forgetPinScreen";
import UserProfileScreen from "./screen/userProfileScreen";
let customFonts = {
  800: require("./assets/fonts/Urbanist-Black.ttf"),
  600: require("./assets/fonts/Urbanist-Bold.ttf"),
  // '400':require('./assets/fonts/UrbanistMedium.ttf'),
  400: require("./assets/fonts/Urbanist-Regular.ttf"),
  // 'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  // async _loadFontsAsync() {
  //   await Font.loadAsync(customFonts);
  //   this.setState({ fontsLoaded: true });
  // }

  // componentDidMount() {
  //   this._loadFontsAsync();
  // }

  render() {
    // if (!this.state.fontsLoaded) {
    //   return null;
    // }
    return <LoginScreen />;
  }
}

// export default function App() {
//   return <SignUpScreen />;
// }
