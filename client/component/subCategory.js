import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

export default function SubCategory({name,image}) {
  return (
    <View style={styles.ThemeLightComponentSongsCard}>
    <View style={styles.SubCategoryCard}>
      <Image
        style={styles.MaskGroup}
        source={{
          uri: image,
          headers: {
            Accept: '*/*',
          },
        }}
      />
      <View style={styles.AutoLayoutVertical}>
        <Text style={styles.Txt748}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SubCategoryCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(249,249,252,1)",
    width: 426,
    height: 77,
  },
  MaskGroup: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  AutoLayoutVertical: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 318,
  },
  Txt748: {
    fontSize: 18,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33,33,33,1)",
  },
});
