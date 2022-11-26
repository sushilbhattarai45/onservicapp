import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Linking,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import SubCategory from "../component/subCategory";
import Header from "../component/Header";
import Constants from "expo-constants";
import { Colors } from "../styles/main";
import axios from "axios";
import { axiosInstance } from "../component/tools";
import Search from "../component/searchBar";

export default function SubCategoryScreen({
  route,
  category_name,
  navigation: { goBack },
}) {
  const { category_id, cat_name } = route.params;
  useEffect(() => {
    async function getAd() {
      const data = await axiosInstance.post("ads/getCatAds", {
        GIVEN_API_KEY: "AXCF",
        ads_tag: cat_name,
      });
      setAds(data?.data?.catads[0]);
      setUriSource(data?.data?.catads[0]?.ads_mediaLink);
    }

    async function getSubC() {
      const data = await axiosInstance.post("subcategories/getfilteredsubcat", {
        GIVEN_API_KEY: "AXCF",
        category_id: category_id,
      });
      setFilteredData(data.data.data);
      setSData(data.data.data);
      setEmptydata(false);
    }
    getSubC();
    getAd();
  }, []);
  const [sData, setSData] = useState();
  const [emptydata, setEmptydata] = useState(true);
  const [ads, setAds] = useState();
  const [urisource, setUriSource] = useState(null);
  // const [sValue, setSvalue] = useState();
  const [filteredData, setFilteredData] = useState(sData);
  const handleSearch = (value) => {
    console.log(value);
    if (value.length > 0) {
      const filter = sData.filter(
        (s) => s.subCat_name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setFilteredData(filter);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        // marginBottom: 10,
        // marginTop: 8,
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
        <View style={{ marginHorizontal: 20 }}>
          <Search
            containerStyle={{ padding: 0, marginTop: 12 }}
            // onFocus={() => setSearching(true)}
            // value={sValue}
            onChangeText={handleSearch}
            onSubmitEditing={() => {
              setFilteredData([]);
            }}
          />
        </View>

        <View style={{ marginTop: 8 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: 16,
            }}
          >
            <View>
              {urisource ? (
                <Pressable
                  onPress={() => Linking.openURL("https://" + ads?.ads_link)}
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
                      uri: urisource,
                      headers: {
                        Accept: "*/*",
                      },
                    }}
                  />
                </Pressable>
              ) : null}
              <View
                style={{
                  marginTop: 24,
                  marginBottom: 30,
                }}
              >
                {!emptydata
                  ? filteredData?.map((subcategory) => {
                      return (
                        <SubCategory
                          id={subcategory._id}
                          hassubcat={subcategory.subCat_hassubCat}
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
