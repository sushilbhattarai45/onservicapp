import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Linking,
  ScrollView,
  Pressable,
} from "react-native";
import SubCategory from "../component/subCategory";
import Header from "../component/Header";
import { Colors } from "../styles/main";
import { axiosInstance } from "../component/tools";
import Search from "../component/searchBar";
import { API_KEY } from "@env";

export default function SubCategoryScreen({ route, navigation: { goBack } }) {
  const { category_id, cat_name } = route.params;
  useEffect(() => {
    async function getAd() {
      const data = await axiosInstance.post("ads/getCatAds", {
        GIVEN_API_KEY: API_KEY,
        ads_tag: cat_name,
      });
      setAds(data?.data?.catads[0]);
      setUriSource(data?.data?.catads[0]?.ads_mediaLink);
    }

    async function getSubC() {
      const data = await axiosInstance.post("subcategories/getfilteredsubcat", {
        GIVEN_API_KEY: API_KEY,
        category_id: category_id,
      });
      console.log(data.data.data);
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
  const [searchFocus, setSearchFocus] = useState();
  const [filteredData, setFilteredData] = useState(sData);
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 50,
          }}
        >
          <View style={{ marginTop: 4 }}>
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
