import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import BookMarkCard from "../component/bookmarkCard";
import Header from "../component/Header";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../styles/main";
import axios from "axios";
import { axiosInstance } from "../component/tools";
export default function BookMarkScreen() {
  useEffect(() => {
    async function getBm() {
      const data = await axiosInstance.post("bm/get", {
        GIVEN_API_KEY: "AXCF",
        user_id: 9846761072,
      });
      if (data.data.statuscode == 201) {
        // console.log(data.data.message);
        const finaldata = data.data.data;
        console.log(finaldata);
        setBmPersons(finaldata);
        setBookmarked(true);
      } else {
        console.log(data.data.message);
        setBookmarked(false);
      }
      // console.log(data.data);
    }
    getBm();
    console.log("ok" + BmPersons);
  }, []);

  const [boomarked, setBookmarked] = useState(false);
  const [BmPersons, setBmPersons] = useState();
  const Persons = [
    {
      name: "Sushil Bhattarai",
      rating: "4.3",
      ratingcount: "300",
      address: "Golpark",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },

    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },

    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },
    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },

    {
      name: "RamKumar",
      rating: "4.3",
      ratingcount: "300",
      address: "Butwal",

      img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
    },

    //  {"name":"Air Conditioner","img":"https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png"},
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.gray200 }}>
      <View
        style={{
          marginTop: Constants.statusBarHeight + 20,
        }}
      >
        <View>
          <Text
            style={{
              paddingHorizontal: 24,
              fontFamily: "Regular",
              fontSize: 24,
              fontWeight: "800",
            }}
          >
            Bookmarks
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            {boomarked
              ? BmPersons.map((persons) => {
                  return (
                    <View
                      style={{
                        marginBottom: 2,
                      }}
                    >
                      <BookMarkCard
                        name={persons.sp_name}
                        image={persons.sp_profileImage}
                        address={persons.sp_district + " " + persons.sp_city}
                        rating={persons.rating}
                        ratingcount={persons.ratingcount}
                      />
                    </View>
                  );
                })
              : null}
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          height: 200,
          // backgroundColor: "red",
        }}
      >
        <Image
          style={{
            alignSelf: "center",
            alignSelf: "center",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          source={{
            uri: "https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png",
            headers: {
              Accept: "*/*",
            },
          }}
        />
      </View>
    </ScrollView>
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
