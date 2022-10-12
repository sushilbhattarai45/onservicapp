import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import SubCategory from "../component/subCategory";
import Header from "../component/Header";
import Constants from "expo-constants";
import { Colors } from "../styles/main";

export default function SubCategoryScreen() {
  const subcategory = [
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },

    //  {"name":"Air Conditioner","img":"https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png"},

    ,
  ];
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        backgroundColor: Colors.gray200,
      }}
    >
      <View
        style={{
          margin: 15,
          marginTop: 20,
        }}
      >
        <Header headerText={"Repair"} />

        <View style={{ marginTop: 60 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: "100%",
                height: 180,
                // backgroundColor: "red",
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  alignSelf: "center",
                  height: "100%",
                  width: "95%",
                }}
                source={{
                  uri: "https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png",
                  headers: {
                    Accept: "*/*",
                  },
                }}
              />
            </View>

            <View
              style={{
                marginTop: 30,
              }}
            >
              {subcategory.map((subcategory) => {
                return (
                  <SubCategory
                    name={subcategory.name}
                    image={subcategory.img}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
