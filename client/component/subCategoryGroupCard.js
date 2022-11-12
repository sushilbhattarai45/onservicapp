import React, { useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppContext from "./appContext";
import App from "../App";
export default function SubCategoryGroupCard({
  containerStyle,
  onPress,
  name,
  cat_name,
  cat_id,
}) {
  const navigation = useNavigation();
  const { userData } = useContext(AppContext);
  return (
    <Pressable
      style={[styles.container, { ...containerStyle }]}
      onPress={() =>
        navigation.navigate("CategoryPersonListing", {
          cat_name: cat_name,
          sub_name: name,
          givencity: userData?.user_district,
          category_id: cat_id,
        })
      }
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jsv4q2x08j9-22%3A191?alt=media&token=2b0aea99-e4d3-49da-ace4-e9d81a9756df",
        }}
      />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
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
