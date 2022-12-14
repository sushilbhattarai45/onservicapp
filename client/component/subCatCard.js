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
import { Colors } from "../styles/main";

export default function SubCategoryCard({
  containerStyle,
  name,
  subcat_id,
  district,
  city,
  image,
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.Category, { ...containerStyle }]}
      onPress={() => {
        navigation.navigate("CategoryPersonListing", {
          givencity: city,
          givendistrict: district,
          sub_name: name,
        });
      }}
    >
      <ImageBackground
        source={{ uri: image }}
        style={{ width: "100%", height: "100%", borderRadius: 24 }}
        imageStyle={{ borderRadius: 8 }}
      >
        <Text
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            padding: 2,
            color: "black",
            fontSize: 11,
            fontWeight: "800",
            fontFamily: "Regular",
            margin: 5,
            position: "absolute",
            bottom: 0,
          }}
        >
          {name}
        </Text>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Category: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 1,
    shadowOffset: { width: 0, height: 4 },
    width: 100,
    height: 100,
    // borderRadius: 24,
  },
});
