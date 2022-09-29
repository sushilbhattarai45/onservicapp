import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Subcat1() {
  return (
    <View style={styles.Subcat1}>
      <Image
        style={styles.Group20}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jsv4q2x08j9-22%3A191?alt=media&token=2b0aea99-e4d3-49da-ace4-e9d81a9756df",
        }}
      />
      <Text style={styles.Txt613}>Carpenter</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Subcat1: {
    position:"relative",
    width: 179,
    height: 88,
  },
  Group20: {
   
    width: 179,
    height: 88,
  },
  Txt613: {
    position:"absolute",
    width:"100%",
  bottom:8,
  left:8,
    fontSize: 14,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "700",
    letterSpacing: -0.28,
    color: "white",
  },
})