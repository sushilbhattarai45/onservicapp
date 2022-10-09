import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import { Colors } from "../styles/main";
export default function PeopleNearYou({ name, image, works, number }) {
  return (
    <View style={styles.Card}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.works}>{works}</Text>
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
  );
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
  },
  works: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.gray900,
    marginBottom: 12,
  },
  image: {
    borderRadius: 50,
    width: 94.49,
    height: 94.49,
    marginBottom: 7,
  },
  name: {
    fontSize: 12.89,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "400",
    lineHeight: 13,
    color: "rgba(33,33,33,1)",
    opacity: 0.9,
    marginBottom: 7,
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
  },
  Txt250: {
    fontSize: 10.02,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "600",
    letterSpacing: -0.2,
    color: "rgba(253,169,42,1)",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
});
