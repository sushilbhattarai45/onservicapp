import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Search from "../component/searchBar";
import { Colors } from "../styles/main";
import SubCatCard from "../component/subCatCard";

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
import { ImageSlider } from "react-native-image-slider-banner";
import { Video } from "expo-av";

const HomeScreen = ({ navigation }) => {
  const {
    categories,
    snearyou,
    logged,
    userData,
    livedistrict,
    ads,
    lpermission,
    setLpermission,
  } = useContext(AppContext);
  const [newaddons, setNewaddons] = useState();
  const [featured, setFeatured] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState();
  const video = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        getData();
      },
      [livedistrict]
    );
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
      console.log(featuredOnHome.data);
      if (!featuredOnHome.error) setFeatured(featuredOnHome.data);
      if (!newaddons.error) setNewaddons(newaddons.data.data);
      else setNewaddons(null);

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

            <Text style={styles.userNeedHelp}>{livedistrict}</Text>
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
                          image={item.category_photo}
                          givencity={livedistrict}
                          category_id={item._id}
                        />
                        {categories[index + 1] && (
                          <CategoryCard
                            givencity={livedistrict}
                            name={categories[index + 1]?.category_name}
                            image={categories[index + 1]?.category_photo}
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
        <ImageSlider
          preview={false}
          data={ads?.hometop?.map((item) => ({
            img: item?.ads_mediaLink,
            ads_link: item?.ads_link,
          }))}
          autoPlay={true}
          closeIconColor="#fff"
          timer={5000}
          indicatorContainerStyle={{ bottom: -10 }}
          inActiveIndicatorStyle={{ opacity: 0.5 }}
          activeIndicatorStyle={{
            backgroundColor: Colors.primary,
            opacity: 0.9,
          }}
          caroselImageStyle={{ resizeMode: "cover", height: 250 }}
          onClick={(item) =>
            item.ads_link ? Linking.openURL("https://" + item.ads_link) : null
          }
        />
        {/* Sub Categorie */}

        {featured && featured?.subCat && (
          <View style={styles.subCategoriesContainer}>
            <Text style={styles.subCategoriesContainerHeading}>
              {featured?.catName}
            </Text>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SubCategoryGroupCard
                  name={featured?.subCat[0]?.subCat_name}
                  image={featured?.subCat[0]?.subCat_photo}
                  cat_name={featured?.catName}
                  givencity={livedistrict}
                  cat_id={featured?.catId}
                />
                <SubCategoryGroupCard
                  name={featured?.subCat[1]?.subCat_name}
                  image={featured?.subCat[1]?.subCat_photo}
                  cat_name={featured?.catName}
                  givencity={livedistrict}
                  cat_id={featured?.catId}
                  containerStyle={{ marginLeft: 16 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <SubCategoryGroupCard
                  image={featured?.subCat[2]?.subCat_photo}
                  name={featured?.subCat[2]?.subCat_name}
                  cat_name={featured?.catName}
                  givencity={livedistrict}
                  cat_id={featured?.catId}
                />
                <SubCategoryGroupCard
                  name={featured?.subCat[3]?.subCat_name}
                  givencity={livedistrict}
                  image={featured?.subCat[3]?.subCat_photo}
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
        )}
        {/* Add */}
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: ads?.homevideo ? ads?.homevideo[0]?.ads_mediaLink : "",
          }}
          shouldPlay
          isMuted={true}
          resizeMode="contain"
          pointerEvents="none"
          isLooping={true}
        />
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
            {newaddons &&
              newaddons?.map((item, index) => {
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
                        image={item?.category_photo}
                        name={item?.category_name}
                        cat_id={item?._id}
                        givencity={livedistrict}
                        navigation={navigation}
                      />
                      {categories[index + 1] && (
                        <NewlyAddedServices
                          givencity={livedistrict}
                          image={newaddons[index + 1]?.category_photo}
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

        <ImageSlider
          preview={false}
          data={ads?.homebottom?.map((item) => ({
            img: item?.ads_mediaLink,
            ads_link: item?.ads_link,
          }))}
          autoPlay={true}
          closeIconColor="#fff"
          timer={5000}
          indicatorContainerStyle={{ bottom: -10 }}
          inActiveIndicatorStyle={{ opacity: 0.5 }}
          activeIndicatorStyle={{
            backgroundColor: Colors.primary,
            opacity: 0.9,
          }}
          caroselImageStyle={{ resizeMode: "cover", height: 250 }}
          onClick={(item) =>
            item.ads_link ? Linking.openURL("https://" + item.ads_link) : null
          }
        />
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
          {lpermission == "true" ? (
            snearyou ? (
              <FlatList
                style={{ marginBottom: 32 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={snearyou}
                renderItem={({ item, index }) => {
                  let isEnd = index === snearyou.length - 1;
                  return (
                    <SubCatCard
                      key={item?._id}
                      district={livedistrict}
                      image={item?.subCat_photo}
                      category_id={item?._id}
                      name={item?.subCat_name}
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
            ) : (
              <View>
                <Text
                  style={{
                    justifyContent: "center",
                    // alignItems: "center",
                    fontFamily: "Regular",
                    textAlign: "center",
                    paddingBottom: 10,
                  }}
                >
                  No Data found for your current Location! Still Searching
                </Text>
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </View>
            )
          ) : (
            <Text
              style={{
                fontFamily: "Regular",
                marginBottom: 20,
                textAlign: "center",
              }}
              onPress={() => {
                alert("Please allow Location access and restart the app");
                setTimeout(() => {
                  Linking.openSettings();
                }, 2000);
              }}
            >
              You havenot allowed Location permission please{"\n"}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: Colors.primary,
                }}
              >
                {" "}
                Allow Location Acess
              </Text>
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
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
  video: {
    height: 250,
    width: Dimensions.get("window").width,
  },
});

export default HomeScreen;
