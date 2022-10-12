import React, { useCallback } from "react";
<<<<<<< HEAD
import {Text, View, SafeAreaView} from 'react-native';
=======
import { Text, View } from "react-native";
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import CategoryPersonListingScreen from "./screen/categoryPersonListingScreen";
import LoginScreen from "./screen/Auth/loginsScreen";
import SignUpScreen from "./screen/Auth/signUpScreen";
import OtpScreen from "./screen/Auth/otpScreen";
import createNewPinScreen from "./screen/Auth/createNewPinScreen";
import CreateNewPinScreen from "./screen/Auth/createNewPinScreen";
import ForgetPinScreen from "./screen/Auth/forgetPinScreen";
<<<<<<< HEAD
=======
// import People from "./screen/peoplenearScreen";
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
import UserProfileScreen from "./screen/userProfileScreen";
import HomeScreen from "./screen/homeScreen";
import SPProfileScreen from "./screen/SPProfileScreen";
// import SplashScreen from "./screen/splashScreen";
<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";

=======
import SubCategoryScreen from "./screen/subCategoryScreen";
import BookMarkScreen from "./screen/bookmarkScreen";
import SearchPersonListingScreen from "./screen/searchPersonListingScreen";
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Black: require("./assets/fonts/Urbanist-Black.ttf"),
    Bold: require("./assets/fonts/Urbanist-Bold.ttf"),
<<<<<<< HEAD
    SemiBold:require("./assets/fonts/Urbanist-SemiBold.ttf"),
=======
    SemiBold: require("./assets/fonts/Urbanist-Medium.ttf"),
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
    Regular: require("./assets/fonts/Urbanist-Regular.ttf"),
    remixicon: require("./assets/fonts/remixicon.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
<<<<<<< HEAD
    return <View style={{flex:1, backgroundColor:'black'}}><Text>Error</Text></View>;
  }

  return (
    <SafeAreaView style={{flex:1}} onLayout={onLayoutRootView}>
      <SPProfileScreen />
    </SafeAreaView>
=======
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SearchPersonListingScreen />
    </View>
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
  );
}

