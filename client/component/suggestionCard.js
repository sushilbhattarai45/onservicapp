import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export default function Suggestions({ text, active, onPress }) {
  return (
    <Pressable
      style={[
        styles.Suggestions,
        active
          ? { backgroundColor: "rgba(255,128,0,1)" }
          : { borderColor: "rgba(255,128,0,1)" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.Txt864,
          { color: active ? "rgba(255, 255, 255, 1)" : "rgba(255,128,0,1)" },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Suggestions: {
    top: 100,
    borderWidth: 2,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  Txt864: {
    fontSize: 16,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
