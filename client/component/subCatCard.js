import React, { createRef } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SubCategoryCard({
  containerStyle,
  name,
  subcat_id,
  district,
  image,
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.Category, { ...containerStyle }]}
      onPress={() => {
        navigation.navigate("CategoryPersonListing", {
          givencity: district,
          sub_name: name,
        });
      }}
    >
      <Image
        style={styles.Repair1}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.Txt035}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Category: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 1,
    shadowOffset: { width: 0, height: 4 },
    width: 140,
    height: 140,
  },

  Repair1: {
    borderRadius: 5,
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  Txt035: {
    fontSize: 14,
    fontFamily: "Regular",
    fontWeight: "400",
    letterSpacing: -0.28,
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    justifyContent: "center",
  },
});
