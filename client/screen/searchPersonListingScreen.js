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
} from "react-native";
import PersonCard from "../component/personCard";
import Search from "../component/searchBar";
import { StatusBar } from "expo-status-bar";
import { SvgUri, G, Path } from "react-native-svg";
import { Constants } from "expo-constants";
import { Colors } from "../styles/main";
import AppContext from "../component/appContext";

export default function SearchPersonListingScreen() {
  const { subCategories } = useContext(AppContext);
  console.log(subCategories);
  // const subcategory = [
  //   {
  //     name: "Car Repair",
  //   },
  //   {
  //     name: "Home Repair",
  //   },
  //   {
  //     name: "Van Repair",
  //   },
  //   {
  //     name: "taxi Repair",
  //   },
  //   {
  //     name: "pokhara Repair",
  //   },
  //   {
  //     name: "DSM ko 4hajar",
  //   },
  // ];
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
  const [searchData, serSearchData] = useState(null);
  const [searching, setSearching] = useState(null);
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: Colors.gray200,
        // margin:ConnectionStates,
        // marginTop: Constants.statusBarHeight + 20,
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: 40,
          backgroundColor: Colors.gray200,
        }}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Search
            containerStyle={{ padding: 0 }}
            rightIcon={"equalizer-fill"}
          />
        </View>
        {/* FlatList */}
        <View>
          <FlatList
            style={{
              marginTop: 15,
              paddingHorizontal: 24,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={subCategories}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={{
                    justifyContent: "center",
                    zIndex: 10,
                    borderWidth: 1.5,
                    borderColor: Colors.primary,
                    borderRadius: 15,
                    marginBottom: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    height: 30,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "SemiBold",
                      textAlignVertical: "center",
                      textAlign: "center",
                      color: Colors.primary,
                    }}
                  >
                    {item.subCat_name}
                  </Text>
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: "100%",
                    width: 8,
                    backgroundColor: Colors.gray200,
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* PersonList */}
        {searchData && (
          <ScrollView style={{ marginTop: 16, flex: 1 }}>
            {Persons.map((persons) => {
              return (
                <View
                  style={{
                    marginTop: 2,
                  }}
                >
                  <PersonCard
                    name={persons.name}
                    image={persons.img}
                    address={persons.address}
                    rating={persons.rating}
                    ratingcount={persons.ratingcount}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}
        {/* notfound */}
        {!searchData && (
          <View
            style={{
              flex: 1,
              marginTop: -50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <SVGImg width={200} height={200} /> */}
            <Image
              style={{
                height: "50%",
                width: "80%",
              }}
              resizeMode="contain"
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7c63n63o6t3-472%3A6676?alt=media&token=fe730173-04a9-40a8-8afd-1445f2a0ac78",
                headers: {
                  Accept: "*/*",
                },
              }}
            />

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
                Sorry, the keyword you entered cannot be found, please check
                again or search with another keyword.
              </Text>
            </View>
          </View>
        )}
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
  },
  MaskGroup: {
    width: 60,
    // height: 60,
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
