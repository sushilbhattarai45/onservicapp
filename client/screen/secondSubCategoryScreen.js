import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import SubCategory from "../component/subCategory";
import Header from "../component/Header";
import Constants from "expo-constants";
import { Colors } from "../styles/main";
import axios from "axios";
import { axiosInstance } from "../component/tools";
import AppContext from "../component/appContext";
import Search from "../component/searchBar";
export default function SecondSubCategoryScreen({
  route,
  category_name,
  navigation: { goBack },
}) {
  const { livedistrict } = useContext(AppContext);
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
      const data = await axiosInstance.post("subcategories/getsecond", {
        GIVEN_API_KEY: "AXCF",
        category_id: category_id,
      });
      setSData(data.data.data);
      setFilteredData(data.data.data);
      setEmptydata(false);
    }
    getAd();
    getSubC();
  }, []);
  const [emptydata, setEmptydata] = useState(true);
  const [sData, setSData] = useState();
  const [ads, setAds] = useState();
  const [urisource, setUriSource] = useState(null);
  const [filteredData, setFilteredData] = useState(sData);
  const [searchFocus, setSearchFocus] = useState();

  const handleSearch = (value) => {
    console.log(value);
    const filter = sData.filter(
      (s) => s.subCat_name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setFilteredData(filter);
  };
  return (
    <View
      style={{
        flex: 1,
        // marginBottom: 90,
        display: "flex",
        // paddingTop: 8,
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
            containerStyle={{
              marginTop: 4,
              paddingHorizontal: 0,
              paddingBottom: 4,
              borderRadius: 0,
              backgroundColor: "none",
              borderBottomWidth: 1,
              borderBottomColor: searchFocus ? Colors.gray900 : Colors.gray500,
            }}
            inputStyle={{}}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            // value={sValue}
            onChangeText={handleSearch}
            onSubmitEditing={() => {
              setFilteredData([]);
            }}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={
              {
                // marginBottom: 20,
              }
            }
          >
            <View>
              {ads ? (
                <Pressable
                  onPress={() => Linking.openURL("https://" + ads?.ads_link)}
                  style={{
                    marginTop: 10,
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
