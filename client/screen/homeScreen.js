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

import CategoryCard from "../component/categoryCard";
import Button from "../component/buttonComponent";
import SubCategoryGroupCard from "../component/subCategoryGroupCard";
import Icon from "../component/Icon";

import { axiosInstance } from "../component/tools";
import AppContext from "../component/appContext";
import { API_KEY, API_URL } from "@env";

const wWidth = Dimensions.get("window").width;

import NewlyAddedServices from "../component/NewlyAddedServices";
import { ImageSlider } from "react-native-image-slider-banner";
import { Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const {
    categories,
    logged,
    userData,
    livedcity,
    livedistrict,
    snearyou,
    user,
    ads,
    lpermission,
    setLpermission,
  } = useContext(AppContext);
  const [newaddons, setNewaddons] = useState();
  const [featured, setFeatured] = useState();
  // const [livedistrict, setLiveDistrict] = useState(null);
  // const [livedcity, setLiveCity] = useState(null);
  // const [snearyou, setSNearYou] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState();
  const video = useRef(null);
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
  });
  // const [errorMsg, setErrorMsg] = useState(null);
  // async function getLocation() {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setLpermission("false");
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   let text = "Waiting..";
  //   if (errorMsg) {
  //     text = errorMsg;
  //   } else if (location) {
  //     setLpermission("true");

  //     setCoords({
  //       latitude: location?.coords?.latitude,
  //       longitude: location?.coords?.longitude,
  //     });
  //     text = location?.coords?.latitude;
  //     let url =
  //       "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  //       location?.coords?.longitude +
  //       "," +
  //       location?.coords?.latitude +
  //       ".json?country=np&limit=1&access_token=pk.eyJ1Ijoib25zZXJ2aWMwMSIsImEiOiJjbGFjbGYycGIwYmljM3ZtaXFkbGFjZTcxIn0.sRocgrMGOjXS98-r7t1G_g";

  //     let res = await axios.get(url);
  //     if (res) {
  //       let district = res?.data?.features[0].context[1].text;
  //       setLiveDistrict(district);

  //       let city = res?.data?.features[0].context[0].text;
  //       setLiveCity(city);

  //       const cat = await axiosInstance.post("/sp/filteredsubcat", {
  //         GIVEN_API_KEY: API_KEY,
  //         city: livedcity,
  //         district: livedistrict,
  //       });

  //       setSNearYou(cat?.data?.subcat);
  //       console.log(JSON.stringify(snearyou));
  //     }
  //   }
  // }

  useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });

    return unsubscribe;
  }, [livedistrict]);
  async function getData() {
    let featuredOnHome = await axiosInstance.post(
      "/categories/featuredOnHome",
      {
        GIVEN_API_KEY: API_KEY,
      }
    );
    let newaddons = await axiosInstance.post("/subcategories/newaddons", {
      GIVEN_API_KEY: API_KEY,
    });
    let formatedNewAddons = [];
    while (newaddons.data.data.length > 0)
      formatedNewAddons.push(newaddons.data.data.splice(0, 2));

    if (!featuredOnHome.error) setFeatured(featuredOnHome.data);
    if (!newaddons.error) setNewaddons(formatedNewAddons);
    else setNewaddons(null);

    if (featuredOnHome.error || newaddons.error) {
    }
  }
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <SafeAreaView>
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
                  Hi{" "}
                  {userData?.user_name ? userData.user_name.split(" ")[0] : ""}!
                  {/* {userData?.user_name} */}
                </Text>
              ) : (
                <Text style={styles.userName}>Hi Guest User!</Text>
              )}

              <Text style={styles.userNeedHelp}>{livedcity}</Text>
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
                  ?.slice(0, categoriesOpen ? categories.length : 4)
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
                  {featured?.subCat[0] && (
                    <SubCategoryGroupCard
                      name={featured?.subCat[0]?.subCat_name}
                      image={featured?.subCat[0]?.subCat_photo}
                      cat_name={featured?.catName}
                      givencity={livedistrict}
                      cat_id={featured?.catId}
                    />
                  )}
                  {featured?.subCat[1] && (
                    <SubCategoryGroupCard
                      name={featured?.subCat[1]?.subCat_name}
                      image={featured?.subCat[1]?.subCat_photo}
                      cat_name={featured?.catName}
                      givencity={livedistrict}
                      cat_id={featured?.catId}
                      containerStyle={{ marginLeft: 16 }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  {featured?.subCat[2] && (
                    <SubCategoryGroupCard
                      image={featured?.subCat[2]?.subCat_photo}
                      name={featured?.subCat[2]?.subCat_name}
                      cat_name={featured?.catName}
                      givencity={livedistrict}
                      cat_id={featured?.catId}
                    />
                  )}
                  {featured?.subCat[3] && (
                    <SubCategoryGroupCard
                      name={featured?.subCat[3]?.subCat_name}
                      givencity={livedistrict}
                      image={featured?.subCat[3]?.subCat_photo}
                      cat_name={featured?.catName}
                      cat_id={featured?.catId}
                      containerStyle={{ marginLeft: 16 }}
                    />
                  )}
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
            onPress={() => alert("ok")}
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
            <FlatList
              data={newaddons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      marginLeft: index === 0 ? 24 : 0,
                      marginRight: index === newaddons?.length - 1 ? 24 : 0,
                    }}
                  >
                    <NewlyAddedServices
                      key={item[0]?.subCat_id}
                      image={item[0]?.subCat_photo}
                      name={item[0]?.subCat_name}
                      cat_id={item[0]._id}
                      givencity={livedistrict}
                      navigation={navigation}
                    />
                    {item.length > 1 ? (
                      <NewlyAddedServices
                        key={item[1]?.subCat_id}
                        image={item[1]?.subCat_photo}
                        name={item[1]?.subCat_name}
                        cat_id={item[1]._id}
                        givencity={livedistrict}
                        navigation={navigation}
                        containerStyle={{ marginTop: 24, marginRight: 24 }}
                      />
                    ) : null}
                  </View>
                );
              }}
            />
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
              snearyou != null ? (
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
                        city={livedcity}
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
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: 0,
    paddingTop: 16,
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
