import React, { createRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Search from "../component/searchBar";
import { Colors } from "../styles/main";

import Constants from "expo-constants";
import CategoryCard from "../component/categoryCard";
import Button from "../component/buttonComponent";
import SubCategoryGroupCard from "../component/subCategoryGroupCard";
import ImageSliderComponent from "../component/imageSlider";
import Icon from "../component/Icon";

const wWidth = Dimensions.get("window").width;
const Persons = [
  {
    name: "Sushil Bhattarai",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Golpark",
    number: "9742993345",

    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },
  {
    name: "Sushil Bhattarai",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Golpark",
    number: "9742993345",

    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },
  {
    name: "Sushil Bhattarai",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Golpark",
    number: "9742993345",

    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },

  {
    name: "RamKumar",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Butwal",
    number: "9742993345",
    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },

  {
    name: "RamKumar",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Butwal",
    number: "9742993345",
    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },
  //  {"name":"Air Conditioner","img":"https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png"},
];

const HomeScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.elipse} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 24,
            paddingHorizontal: 24,
          }}
        >
          <View>
            <Text style={styles.userName}>Hey Sanskar!</Text>
            <Text style={styles.userNeedHelp}>Need help?</Text>
          </View>
          <Icon name="qr-scan-line" size={24} color="white" />
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <Search />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <CategoryCard />
              <CategoryCard containerStyle={{ marginLeft: 16 }} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <CategoryCard />
              <CategoryCard containerStyle={{ marginLeft: 16 }} />
            </View>
          </View>
          <View style={{ width: 150, marginTop: 24 }}>
            <Button label={"View All"} />
          </View>
        </View>

        {/* Sub Categorie */}
        <View style={styles.subCategoriesContainer}>
          <Text style={styles.subCategoriesContainerHeading}>
            Electrician, Carpenter & Plumber
          </Text>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <SubCategoryGroupCard />
              <SubCategoryGroupCard containerStyle={{ marginLeft: 16 }} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <SubCategoryGroupCard />
              <SubCategoryGroupCard containerStyle={{ marginLeft: 16 }} />
            </View>
            <View style={{ width: 150, marginTop: 24 }}>
              <Button label={"View All"} />
            </View>
          </View>
        </View>
        {/* Add */}
        <ImageSliderComponent />

        {/* Sub Categorie */}
        <View style={styles.subCategoriesContainer}>
          <Text style={styles.subCategoriesContainerHeading}>
            Newly added Services
          </Text>

          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <SubCategoryGroupCard />
              <SubCategoryGroupCard containerStyle={{ marginLeft: 16 }} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <SubCategoryGroupCard />
              <SubCategoryGroupCard containerStyle={{ marginLeft: 16 }} />
            </View>
            <View style={styles.Seemore}>
              <Text style={styles.Txt499}>View All</Text>
              <Image
                style={styles.chevronLeftIcon}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/dxg5x93mpp6-22%3A233?alt=media&token=29e7a436-2721-424a-a9f3-c2973de8de90",
                }}
              />
            </View>
          </View>
        </View>

        {/* Add */}
        <ImageSliderComponent />

        {/* Services Near you */}
        <View>
          <Text
            style={[
              styles.subCategoriesContainerHeading,
              { marginTop: 32, paddingHorizontal: 24 },
            ]}
          >
            Services Near You
          </Text>
          <FlatList
            style={{ marginBottom: 32 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Persons}
            renderItem={({ item, index }) => {
              let isEnd = index === Persons.length - 1;
              return (
                <CategoryCard
                  containerStyle={{
                    marginLeft: index === 0 ? 24 : 0,
                    marginRight: isEnd ? 24 : 0,
                  }}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: "100%",
                    width: 20,
                    backgroundColor: Colors.gray200,
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 16,
    // padding: 24,
    backgroundColor: Colors.gray200,
  },
  elipse: {
    backgroundColor: Colors.primary,
    width: 1000,
    height: 1000,
    borderRadius: 500,
    position: "absolute",
    top: -750,
    left: -500 + wWidth / 2,
  },
  userName: {
    fontSize: 24,
    lineHeight: 28,
    color: Colors.white,
    fontFamily: "Bold",
  },
  userNeedHelp: {
    fontSize: 16,
    color: Colors.gray200,
    fontFamily: "Regular",
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  subCategoriesContainer: {
    marginBottom: 32,
    justifyContent: "center",
    // alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    padding: 24,
  },
  subCategoriesContainerHeading: {
    marginBottom: 24,
    fontFamily: "Bold",
    fontSize: 20,
  },
  Seemore: {
    flexDirection: "row",
    marginTop: 24,
  },
  Txt499: {
    fontSize: 16,
    fontFamily: "Regular",
    fontWeight: "400",
    letterSpacing: -0.32,
    color: Colors.primary,
    // textAlign: "right",
    justifyContent: "flex-end",
    width: 53,
    height: 19,
  },
  chevronLeftIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default HomeScreen;
