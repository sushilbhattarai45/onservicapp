import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PersonCard from "../component/personCard";
import Search from "../component/searchBar";
import { StatusBar } from "expo-status-bar";
import { SvgUri, G, Path } from "react-native-svg";
import { Constants } from "expo-constants";
import { Colors } from "../styles/main";
import AppContext from "../component/appContext";
import { axiosInstance } from "../component/tools";

export default function SearchPersonListingScreen() {
  const { subCategories } = useContext(AppContext);

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

  const [searchData, setSearchData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const getPeopleList = async (location, skill) => {
    const res = await axiosInstance.post("/sp/getSearchedSp/", {
      skill: skill,
      city: "ram",
      GIVEN_API_KEY: "AXCF",
    });
    console.log(res.data.data);
    if (res.data.data.length > 0) {
      setSearchData(res.data.data);
    } else {
      setSearchData(null);
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.gray200,
        marginTop: 40,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ paddingHorizontal: 24 }}>
        <Search
          containerStyle={{ padding: 0 }}
          rightIcon={"equalizer-fill"}
          onBlur={() => setSearching(false)}
          onFocus={() => setSearching(true)}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {/* Suggestions */}
      {searching && (
        <View style={{ marginTop: 16, backgroundColor: Colors.white }}>
          <ScrollView keyboardShouldPersistTaps={"handled"}>
            {subCategories.map((item, index) => {
              return (
                <Pressable
                  style={{
                    padding: 16,
                    paddingHorizontal: 24,
                    borderColor: Colors.gray500,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                  key={index.toString()}
                  onPress={() => {
                    Keyboard.dismiss();
                    console.log("hello");
                    setSearchText(item.subCat_name);
                    getPeopleList("", item.subCat_name);
                  }}
                >
                  <Text>{item.subCat_name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
      {/* PersonList */}
      {searchData && !searching && (
        <ScrollView style={{ marginTop: 16, flex: 1 }}>
          {searchData.map((person, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  marginTop: 2,
                }}
              >
                <PersonCard
                  name={person.sp_name}
                  image={
                    "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg"
                  }
                  address={person.sp_city + person.sp_district}
                  rating={5}
                  ratingcount={5}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
      {/* notfound */}
      {!searchData && !searching && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <View>
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7c63n63o6t3-472%3A6676?alt=media&token=fe730173-04a9-40a8-8afd-1445f2a0ac78",
                headers: {
                  Accept: "*/*",
                },
              }}
              style={{ width: "90%", aspectRatio: 1.5 }}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Regular",
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              Not Found
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Regular",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Sorry, the keyword you entered cannot be found, please check again
              or search with another keyword.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
