import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const NewlyAddedServices = ({ containerStyle, name, cat_id }) => {
  const navigation = useNavigation();
  return (
    <View style={{ ...containerStyle }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SubCategory", {
            category_id: cat_id,
            cat_name: name,
          });
        }}
      >
        <Image
          style={{ width: 100, borderRadius: 8, height: 100 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jsv4q2x08j9-22%3A191?alt=media&token=2b0aea99-e4d3-49da-ace4-e9d81a9756df",
          }}
        />
        <Text style={{ fontFamily: "Regular", fontSize: 16, marginTop: 8 }}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
export default NewlyAddedServices;
