import React from "react";
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

export default function BookMarkScreen() {
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
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <Text
            style={{ fontFamily: "Regular", fontSize: 25, fontWeight: "800" }}
          >
            Bookmarks
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            {Persons.map((persons) => {
              return (
                <View
                  style={{
                    marginBottom: 5,
                  }}
                >
                  <BookMarkCard
                    name={persons.name}
                    image={persons.img}
                    address={persons.address}
                    rating={persons.rating}
                    ratingcount={persons.ratingcount}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 30,
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
            width: "90%",
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
