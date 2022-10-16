import React, { createRef, useEffect, useState } from "react";
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
import { axiosInstance } from "../component/tools";

const wWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesOpen, setCategoriesOpen] = useState();

  useEffect(() => {
    async function getData() {
      let res = await axiosInstance.post("/categories?", {
        GIVEN_API_KEY: "AXCF",
      });
      let featuredOnHome = await axiosInstance.post('/subcategories/newaddons');
      console.log(featuredOnHome)
      if (!res.error) {
        setCategories(res.data);
      } else {
        console.error(res.error);
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
            {categories !== [] &&
              categories
                .slice(0, categoriesOpen ? categories.length : 4)
                .map((item, index) => {
                  console.log(categories[index+1]?.category_name);
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
                        />
                        {categories[index+1] && <CategoryCard
                          name={categories[index + 1]?.category_name}
                          containerStyle={{ marginLeft: 16 }}
                        />
                        }
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
            data={categories}
            renderItem={({ item, index }) => {
              let isEnd = index === categories.length - 1;
              console.log(item.category_id);
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
