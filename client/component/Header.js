import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import Constants from "expo-constants";

export default function Header({ headerText, onPressIcon, icon }) {
  return (
    <View style={styles.header}>
      <Image
        style={styles.icon}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ag65kgjdi0n-184%3A1078?alt=media&token=643549ba-f04f-47ae-b002-4d48e255f978",
        }}
      />
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    top: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  right: {
    marginLeft: "auto",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Bold",
    letterSpacing: -0.4,
    color: "rgba(33,33,33,1)",
  },
});
