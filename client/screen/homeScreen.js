import React, { createRef, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { S } from "@env";

import { axiosInstance } from "../component/tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../component/appContext";
const wWidth = Dimensions.get("window").width;
const NewlyAddedServices = ({ containerStyle, name }) => {
  return (
    <View style={{ ...containerStyle }}>
      <Image
        style={{ width: 100, borderRadius: 8, height: 100 }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jsv4q2x08j9-22%3A191?alt=media&token=2b0aea99-e4d3-49da-ace4-e9d81a9756df",
        }}
      />
      <Text style={{ fontFamily: "Regular", fontSize: 16, marginTop: 8 }}>
        {name}
      </Text>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { categories } = useContext(AppContext);
  console.log(categories);
  // const [categories, setCategories] = useState([]);
  const [newaddons, setNewaddons] = useState();
  const [featured, setFeatured] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function getData() {
      const number = await AsyncStorage.getItem("user_contact");

      if (number.length != 0) {
        setLoggedIn(true);
        let user = await axiosInstance.post("/user/getOneUser", {
          GIVEN_API_KEY: "AXCF",
          user_contact: number,
        });
        setUserData(user?.data.data);
      }

      let res = await axiosInstance.post("/categories?", {
        GIVEN_API_KEY: "AXCF",
      });
      let featuredOnHome = await axiosInstance.post(
        "/categories/featuredOnHome",
        {
          GIVEN_API_KEY: "AXCF",
        }
      );
      let newaddons = await axiosInstance.post("/categories/newaddons", {
        GIVEN_API_KEY: "AXCF",
      });

      // console.log(newaddons.data);
      if (!featuredOnHome.error) setFeatured(featuredOnHome.data);
      if (!newaddons.error) setNewaddons(newaddons.data.data);

      if (res.error || featuredOnHome.error || newaddons.error) {
        console.error(res?.error);
        console.error(featuredOnHome?.error);
        console.error(newaddons?.error);
      }
    }
    getData();
  }, []);

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
            {loggedIn ? (
              <Text style={styles.userName}>Hey {userData?.user_name}!</Text>
            ) : (
              <Text style={styles.userName}>Hey User!</Text>
            )}
            <Text style={styles.userNeedHelp}>Need help?</Text>
          </View>
          <Icon name="qr-scan-line" size={24} color="white" />
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Search editable={false} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <View>
            {categories !== [] &&
              categories
                .slice(0, categoriesOpen ? categories.length : 4)
                .map((item, index) => {
                  if (index % 2 == 0) {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: index === 0 ? 0 : 16,
                        }}
                      >
                        <CategoryCard
                          name={item.category_name}
                          category_id={item._id}
                        />
                        {categories[index + 1] && (
                          <CategoryCard
                            name={categories[index + 1]?.category_name}
                            category_id={categories[index + 1]?._id}
                            containerStyle={{ marginLeft: 16 }}
                          />
                        )}
                      </View>
                    );
                  }
                })}
          </View>
          <View style={{ width: 150, marginTop: 24 }}>
            <Button
              label={categoriesOpen ? "View Less" : "View All"}
              onPress={() => setCategoriesOpen((prev) => !prev)}
            />
          </View>
        </View>

        {/* Sub Categorie */}
        <View style={styles.subCategoriesContainer}>
          <Text style={styles.subCategoriesContainerHeading}>
            {featured?.catName}
          </Text>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <SubCategoryGroupCard
                name={featured?.subCat[0]?.subCat_name}
                cat_name={featured?.catName}
                cat_id={featured?.catId}
              />
              <SubCategoryGroupCard
                name={featured?.subCat[1]?.subCat_name}
                cat_name={featured?.catName}
                cat_id={featured?.catId}
                containerStyle={{ marginLeft: 16 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <SubCategoryGroupCard
                name={featured?.subCat[2]?.subCat_name}
                cat_name={featured?.catName}
                cat_id={featured?.catId}
              />
              <SubCategoryGroupCard
                name={featured?.subCat[3]?.subCat_name}
                cat_name={featured?.catName}
                cat_id={featured?.catId}
                containerStyle={{ marginLeft: 16 }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 24 }}>
              <Text
                onPress={() => {
                  navigation.navigate("SubCategory", {
                    category_id: featured?.catId,
                    cat_name: featured?.catName,
                  });
                }}
                style={{
                  fontSize: 16,
                  fontFamily: "Regular",
                  color: Colors.primary,
                }}
              >
                See More{" "}
              </Text>
              <Icon
                name="arrow-right-s-line"
                size={20}
                color={Colors.primary}
                style={{ marginLeft: 4 }}
              />
            </View>
          </View>
        </View>
        {/* Add */}
        <ImageSliderComponent />

        {/* New Addons */}
        <View
          style={[
            styles.subCategoriesContainer,
            { marginTop: 32, paddingHorizontal: 0 },
          ]}
        >
          <Text
            style={{
              ...styles.subCategoriesContainerHeading,
              paddingHorizontal: 24,
            }}
          >
            Newly added Services
          </Text>

          <ScrollView
            contentContainerStyle={{ alignItems: "flex-start" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {newaddons?.map((item, index) => {
              if (index % 2 == 0) {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: index === 0 ? 24 : 0,
                      marginRight: index === newaddons.length - 1 ? 24 : 0,
                    }}
                  >
                    <NewlyAddedServices name={item.category_name} />
                    {categories[index + 1] && (
                      <NewlyAddedServices
                        name={newaddons[index + 1]?.category_name}
                        containerStyle={{ marginTop: 24, marginRight: 24 }}
                      />
                    )}
                  </View>
                );
              }
            })}
          </ScrollView>
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
            data={categories}
            renderItem={({ item, index }) => {
              let isEnd = index === categories.length - 1;
              return (
                <CategoryCard
                  key={item._id}
                  name={item.category_name}
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
