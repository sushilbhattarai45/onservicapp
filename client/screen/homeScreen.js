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
// import { S, URL } from "@env";

import { axiosInstance } from "../component/tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../component/appContext";
const wWidth = Dimensions.get("window").width;

import NewlyAddedServices from "../component/NewlyAddedServices";

const HomeScreen = ({ navigation }) => {
  const { categories, user, logged, userData, isitsp, setIsitSp } =
    useContext(AppContext);
  console.log(userData);
  const [newaddons, setNewaddons] = useState();
  const [featured, setFeatured] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
      //Put your Data loading function here instead of my loadData()
    });
    async function getData() {
      let featuredOnHome = await axiosInstance.post(
        "/categories/featuredOnHome",
        {
          GIVEN_API_KEY: "AXCF",
        }
      );
      let newaddons = await axiosInstance.post("/categories/newaddons", {
        GIVEN_API_KEY: "AXCF",
      });

      if (!featuredOnHome.error) setFeatured(featuredOnHome.data);
      if (!newaddons.error) setNewaddons(newaddons.data.data);

      if (res.error || featuredOnHome.error || newaddons.error) {
        console.error(res?.error);
        console.error(featuredOnHome?.error);
        console.error(newaddons?.error);
      }
    }
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
            {logged == "true" ? (
              <Text style={styles.userName}>
                Hi {userData?.user_name ? userData.user_name.split(" ")[0] : ""}
                !{/* {userData?.user_name} */}
              </Text>
            ) : (
              <Text style={styles.userName}>Hello User!</Text>
            )}
            <Text style={styles.userNeedHelp}>Need help?</Text>
          </View>
          <Icon
            onPress={() => navigation.navigate("QrScreen")}
            name="qr-scan-line"
            size={24}
            style={{
              padding: 10,
            }}
            color="white"
          />
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Search editable={false} style={{}} />
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
        <ImageSliderComponent data={[]} />

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
                    <NewlyAddedServices
                      name={item.category_name}
                      cat_id={item._id}
                      navigation={navigation}
                    />
                    {categories[index + 1] && (
                      <NewlyAddedServices
                        cat_id={newaddons[index + 1]?._id}
                        navigation={navigation}
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
        <ImageSliderComponent data={[]} />

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
                  category_id={item._id}
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
