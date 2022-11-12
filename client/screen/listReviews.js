import { React, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
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
export default function ListReviews({ route, navigation }) {
  const { sp_contact } = route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSpData();
      //Put your Data loading function here instead of my loadData()
    });
    async function getSpData() {
      let res = await axiosInstance.post("/review/getSpreview", {
        sp_id: sp_contact,
        GIVEN_API_KEY: "AXCF",
      });

      setReviews(res.data.data);
      console.log("ok" + JSON.stringify(res.data.data));
    }
    return unsubscribe;
    // getSpData();
  }, [navigation]);
  const [reviews, setReviews] = useState();

  return (
    <View
      style={{
        backgroundColor: Colors.gray200,
        flex: 1,
        paddingBottom: 20,
        // margin:ConnectionStates,
        // marginTop: Constants.statusBarHeight + 20,
      }}
    >
      <Header
        headerText="Reviews"
        onPressIcon={() => navigation.goBack()}
        style={{ paddingHorizontal: 10 }}
        icon="arrow-left-line"
      />
      <View style={{ marginTop: 10, marginBottom: 50 }}>
        <ScrollView
          style={{ backgroundColor: Colors.gray200 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 20 }}>
            {reviews?.map((item) => {
              return (
                <View
                  style={{
                    marginTop: 2,
                  }}
                >
                  <ReviewCard
                    image={item.user_profile_image}
                    rating={item.review_stars}
                    name={item.user_name}
                    review={item.review_bio}
                    doc={item.review_doc}
                  />
                </View>
              );
            })}
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
