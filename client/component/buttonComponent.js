import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground, Pressable } from "react-native";
import { Colors } from "../styles/main";

export default function Button({  onPress, label }) {
  return (
    <Pressable onPress={onPress} style={styles.Button}>
      <Text style={styles.Txt226}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Button: {
    //   display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderColor: Colors.primary,
    height: 40,
  },
  Txt226: {
    fontSize: 14,
    fontFamily: "SemiBold",
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
});
