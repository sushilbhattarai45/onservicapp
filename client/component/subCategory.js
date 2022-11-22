import React, { useContext, useReducer } from "react";
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
import AppContext from "./appContext";
export default function SubCategory({
  name,
  image,
  cat_name,
  hassubcat,
  category_id,
  givencity,
  id,
}) {
  const navigation = useNavigation();
  const { userData } = useContext(AppContext);
  return (
    <View style={styles.ThemeLightComponentSongsCard}>
      <TouchableOpacity
        onPress={() => {
          if (!hassubcat) {
            navigation.navigate("CategoryPersonListing", {
              category_id: category_id,
              cat_name: cat_name,
              sub_name: name,
              givencity: userData?.user_district,
            });
          } else {
            navigation.navigate("SecondSubCategory", {
              category_id: id,
              cat_name: name,
              // sub_name: name,
              // givencity: userData?.user_district,
            });
          }
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
    borderRadius: 10,
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
