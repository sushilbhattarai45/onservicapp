import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

export default function CategoryCard({ containerStyle }) {
  return (
    <View style={[styles.Category, {...containerStyle}]}>
      <Image
        style={styles.Repair1}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/qqlret7skn-I155%3A2151%3B22%3A106?alt=media&token=505e72a8-f261-4f38-81e1-bfae6f037c3e",
        }}
      />
      <Text style={styles.Txt035}>Repair</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Category: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 18,
    paddingBottom: 22,
    paddingLeft: 41,
    paddingRight: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 1,
    shadowOffset: { width: 0, height: 4 },
    width: 140,
    height: 140,
  },

  Repair1: {
    width: 59,
    height: 59.82,
    marginBottom: 27,
  },
  Txt035: {
    fontSize: 14,
    fontFamily: "Regular",
    fontWeight: "400",
    letterSpacing: -0.28,
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 56,
    height: 18,
  },
});
