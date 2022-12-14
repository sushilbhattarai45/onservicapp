import React, { useCallback } from "react";
import { Text, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppStack from "./navigation/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import { ContextProvider } from "./component/appContext";
SplashScreen.preventAutoHideAsync();
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    Black: require("./assets/fonts/Urbanist-Black.ttf"),
    Bold: require("./assets/fonts/Urbanist-Bold.ttf"),
    SemiBold: require("./assets/fonts/Urbanist-SemiBold.ttf"),
    Regular: require("./assets/fonts/Urbanist-Regular.ttf"),
    remixicon: require("./assets/fonts/remixicon.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <>
      <ContextProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer onReady={onLayoutRootView} style={{ flex: 1 }}>
            <AppStack />
          </NavigationContainer>
        </SafeAreaView>
      </ContextProvider>
      <StatusBar barStyle="light-content" backgroundColor={"#000000"} />
    </>
  );
}
