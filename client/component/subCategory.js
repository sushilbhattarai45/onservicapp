import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../styles/main";
import { useNavigation } from "@react-navigation/native";

export default function SubCategory({ name, image }) {
  const navigation = useNavigation();

  return (
    <View style={styles.ThemeLightComponentSongsCard}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CategoryPersonListing", {
            category_id: "123",
          });
        }}
      >
        <View style={styles.SubCategoryCard}>
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
            <Text style={styles.Txt748}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 2,
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
  },
  Txt748: {
    fontSize: 18,
    fontFamily: "Regular",
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33,33,33,1)",
  },
});
