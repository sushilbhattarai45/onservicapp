import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import { Colors } from "../styles/main";
export default function PeopleNearYou({
  name,
  image,
  works,
  number,
  containerStyle,
}) {
  return (
    <View style={[styles.Card, containerStyle]}>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Colors.white,
    width: 180,
  },
  works: {
    fontSize: 10,
    textAlign: "center",
    fontFamily:'Regular',
    color: Colors.gray900,
    marginBottom: 8,
  },
  image: {
    borderRadius: 50,
    width: 95,
    height: 95,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: "Regular",
    color: Colors.black,
    opacity: 0.9,
    marginBottom: 7,
  },

  Ratings: {
    width: 68,
    height: 12,
    // opacity: 0.9,
    marginBottom: 8,
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
    fontFamily: "SemiBold",
    fontWeight: "600",
    letterSpacing: -0.2,
    color: "rgba(253,169,42,1)",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
});
