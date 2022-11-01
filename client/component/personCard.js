import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import { Colors } from "../styles/main";

export default function PersonCard({
  name,
  image,
  rating,
  ratingcount,
  address,
}) {
  return (
    <View style={styles.ThemeLightComponentSongsCard}>
      <Image
        style={styles.MaskGroup}
        source={{
          uri: image,
          headers: {
            Accept: "*/*",
          },
        }}
      />
      <View style={styles.AutoLayoutVertical}>
        <View>
          <Text style={styles.Txt758}>{name}</Text>
          <Text style={styles.works}>
            ★{rating}({ratingcount}) • {address} • Technician
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ThemeLightComponentSongsCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  MaskGroup: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 20,
  },
  AutoLayoutVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  Txt758: {
    fontSize: 18,
    fontFamily: "Regular",
    fontWeight: "400",
    color: Colors.black,
    marginBottom: 10,
  },
  works: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Regular",
    fontSize: 12,
    color: Colors.gray900,
  },
});
