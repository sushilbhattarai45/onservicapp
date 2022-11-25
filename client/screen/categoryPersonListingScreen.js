import { React, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";
import PersonCard from "../component/personCard";
import Search from "../component/searchBar";
import { StatusBar } from "expo-status-bar";
import { Constants } from "expo-constants";
import { Colors } from "../styles/main";
import Header from "../component/Header";
import axios from "axios";
import AppContext from "../component/appContext";
import { axiosInstance } from "../component/tools";
export default function CategoryPersonListingScreen({
  route,
  navigation,
  navigation: { goBack },
}) {
  const [rating, setRating] = useState(3);
  const { userData, logged } = useContext(AppContext);
  const { category_id, cat_name, givencity, sub_name } = route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSpData();
      getAd();
      //Put your Data loading function here instead of my loadData()
    });

    async function getAd() {
      const data = await axiosInstance.post("ads/getCatAds", {
        GIVEN_API_KEY: "AXCF",
        ads_tag: sub_name,
      });
      setAds(data?.data?.catads[0]);
      setUriSource(data?.data?.catads[0]?.ads_mediaLink);
    }

    async function getSpData() {
      const data = await axiosInstance.post("sp/getSearchedSp", {
        GIVEN_API_KEY: "AXCF",
        city: givencity,
        skill: sub_name,
      });
      setSpData(data.data.data);
      setHasData(true);
    }
    return unsubscribe;
    // getSpData();
  }, [navigation]);
  const [spData, setSpData] = useState();
  const [hasData, setHasData] = useState(false);
  const [ads, setAds] = useState();
  const [urisource, setUriSource] = useState(null);
  return (
    <View
      style={{
        backgroundColor: Colors.gray200,
        flex: 1,
        marginBottom: 10,
        marginTop: 8,
      }}
    >
      <Header
        headerText={sub_name}
        onPressIcon={() => goBack()}
        style={{ paddingHorizontal: 10 }}
        icon="arrow-left-line"
      />
      <View style={{ marginBottom: 50 }}>
        <ScrollView
          style={{ backgroundColor: Colors.gray200 }}
          showsVerticalScrollIndicator={false}
        >
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
          <View style={{ marginTop: 16 }}>
            {givencity ? (
              <Text
                style={{
                  fontFamily: "Regular",
                  marginHorizontal: 15,
                }}
              >
                This Data contains the list of the service provider from
                District{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {givencity}
                </Text>
              </Text>
            ) : (
              <Text
                style={{
                  marginHorizontal: 15,
                }}
              >
                {" "}
                This Data contains the list of the service provider from All
                Over Nepal
              </Text>
            )}
            {hasData
              ? spData.map((persons) => {
                  return (
                    <View
                      style={{
                        marginTop: 2,
                      }}
                    >
                      <PersonCard
                        subcat={sub_name}
                        sp_contact={persons.sp_contact}
                        verified={persons.sp_verified}
                        name={persons.sp_name}
                        image={persons.sp_profileImage}
                        address={persons.sp_city + " " + persons.sp_district}
                        rating={persons.rating}
                        onPress={() =>
                          navigation.navigate("Sp", { sp: persons })
                        }
                        ratingcount={persons.ratingcount}
                      />
                    </View>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ThemeLightComponentSongsCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(249,249,252,1)",
    width: 426,
    height: 77,
  },
  MaskGroup: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 20,
  },
  AutoLayoutVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    width: 318,
  },
  Txt748: {
    fontSize: 18,
    fontFamily: "Regular",
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33,33,33,1)",
    width: 319,
  },
});
