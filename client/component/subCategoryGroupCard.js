import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SubCategoryGroupCard({
  containerStyle,
  onPress,
  name,
  cat_name,
  image,
  cat_id,
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.container, { ...containerStyle }]}
      onPress={() =>
        navigation.navigate("CategoryPersonListing", {
          cat_name: cat_name,
          sub_name: name,
          category_id: cat_id,
        })
      }
    >
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    // alignContent: "center",
    // backgroundColor: "red",
  },
  image: {
    borderRadius: 4,

    height: 80,
  },
  text: {
    position: "absolute",
    bottom: 8,
    left: 8,
    fontSize: 14,
    fontFamily: "Bold",
    // fontWeight: "700",
    letterSpacing: -0.28,
    color: "white",
  },
});
