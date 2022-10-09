import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function PeopleNearYou({
    name,
    image,
    
}) {
  return (
    <View style={styles.Card}>
      <Image
        style={styles.MaskGroup}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7s66fqpdgn7-I548%3A1377%3B466%3A336?alt=media&token=81994894-928e-42bb-b70a-90f9a78cf263",
        }}
      />
      <Text style={styles.Txt919}>Tilganga Chapagain </Text>
      <Text style={styles.multiple1}>
        Air Conditioner Repair · Television Repair · Car Renting
      </Text>
      <Image
        style={styles.Ratings}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7s66fqpdgn7-I548%3A1377%3B472%3A4031?alt=media&token=fb31f454-83fe-4f5e-8c57-4690434f1689",
        }}
      />
      <View style={styles.Button}>
        <Text style={styles.Txt250}>Visit</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10.74,
    paddingBottom: 10.74,
    paddingLeft: 16.46,
    paddingRight: 16.46,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 177.54,
    height: 211.47,
  },
  MaskGroup: {
    width: 94.49,
    height: 94.49,
    marginBottom: 7,
  },
  Txt919: {
    fontSize: 12.89,
    fontFamily: "Regular",
    lineHeight: 13,
    color: "rgba(33,33,33,1)",
    opacity: 0.9,
    marginBottom: 7,
  },
  multiple1: {
    main: "Txt217",
    seg1: "[object Object]",
    seg2: "[object Object]",
    seg3: "[object Object]",
    seg4: "[object Object]",
    seg5: "[object Object]",
  },
  Ratings: {
    width: 68,
    height: 12,
    opacity: 0.9,
    marginBottom: 7,
  },
  Button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingLeft: 23.5,
    paddingRight: 23.5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(253,169,42,1)",
    opacity: 0.9,
    width: 143.17,
    height: 22.45,
  },
  Txt250: {
    fontSize: 10.02,
    fontFamily: "SemiBold",
    fontWeight: "600",
    letterSpacing: -0.2,
    color: "rgba(253,169,42,1)",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
})
