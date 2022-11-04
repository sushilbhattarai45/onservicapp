import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { axiosInstance } from "../component/tools";

export default function SubCategoryScreen({
  route,
  category_name,
  navigation: { goBack },
}) {
  const { category_id, cat_name } = route.params;
  useEffect(() => {
    async function getSubC() {
      const data = await axiosInstance.post("subcategories/getfilteredsubcat", {
        GIVEN_API_KEY: "AXCF",
        category_id: category_id,
      });
      setSData(data.data.data);
      setEmptydata(false);
      console.log(JSON.stringify(sData));
      console.log("OK");
    }
    getSubC();
  }, []);
  const [emptydata, setEmptydata] = useState(true);

  const [sData, setSData] = useState();
  // const subcategory = [
  //   {
  //     name: "Telivision",
  //     img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
  //   },
  //   {
  //     name: "Telivision",
  //     img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
  //   },
  //   {
  //     name: "Telivision",
  //     img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
  //   },
  //   {
  //     name: "Telivision",
  //     img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
  //   },
  //   {
  //     name: "Telivision",
  //     img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
  //   },

  //  {"name":"Air Conditioner","img":"https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png"},

  //   ,
  // ];
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        backgroundColor: Colors.gray200,
      }}
    >
      <View>
        <Header
          headerText={cat_name}
          onPressIcon={() => goBack()}
          style={{ paddingHorizontal: 12 }}
          icon="arrow-left-line"
        />

        <View style={{ marginTop: 24 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: 20,
            }}
          >
            <View>
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
                  marginTop: 24,
                  marginBottom: 30,
                }}
              >
                {!emptydata
                  ? sData.map((subcategory) => {
                      return (
                        <SubCategory
                          category_id={category_id}
                          cat_name={cat_name}
                          name={subcategory.subCat_name}
                          image={subcategory.subCat_photo}
                        />
                      );
                    })
                  : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
