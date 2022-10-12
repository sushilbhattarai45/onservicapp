import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import CategoryPersonListingScreen from "./screen/categoryPersonListingScreen";
import LoginScreen from "./screen/Auth/loginsScreen";
import SignUpScreen from "./screen/Auth/signUpScreen";
import OtpScreen from "./screen/Auth/otpScreen";
import createNewPinScreen from "./screen/Auth/createNewPinScreen";
import CreateNewPinScreen from "./screen/Auth/createNewPinScreen";
import ForgetPinScreen from "./screen/Auth/forgetPinScreen";
// import People from "./screen/peoplenearScreen";
import UserProfileScreen from "./screen/userProfileScreen";
import HomeScreen from "./screen/homeScreen";
// import SplashScreen from "./screen/splashScreen";
import SubCategoryScreen from "./screen/subCategoryScreen";
import BookMarkScreen from "./screen/bookmarkScreen";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Black: require("./assets/fonts/Urbanist-Black.ttf"),
    Bold: require("./assets/fonts/Urbanist-Bold.ttf"),
    SemiBold: require("./assets/fonts/Urbanist-Medium.ttf"),
    Regular: require("./assets/fonts/Urbanist-Regular.ttf"),
    remixicon: require("./assets/fonts/remixicon.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SubCategoryScreen />
    </View>
  );
}
