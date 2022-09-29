import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Frame23({headerText=<Text style={styles.headerText}> hello</Text>, onPressButton}) {
  return (
    <View style={styles.Frame23}>
      <Image
        style={styles.IconlyLightOutlineArrowLeft}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ag65kgjdi0n-184%3A1078?alt=media&token=643549ba-f04f-47ae-b002-4d48e255f978",
        }}
      />
     {headerText}
    </View>
  )
}

const styles = StyleSheet.create({
  Frame23: {
    top:100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 28,
  },
  IconlyLightOutlineArrowLeft: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "700",
    letterSpacing: -0.4,
    color: "rgba(33,33,33,1)",
  },
})