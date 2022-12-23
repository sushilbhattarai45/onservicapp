import React, { createRef, useContext, useEffect, useState } from "react";
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
  TextInput,
  Linking,
} from "react-native";
import PersonCard from "../component/personCard";
import Search from "../component/searchBar";
import { API_KEY } from "@env";

import { Constants } from "expo-constants";
import { Colors } from "../styles/main";
import AppContext from "../component/appContext";
import { axiosInstance } from "../component/tools";
import ModalPopup from "../component/Modal";
import { Dropdown } from "react-native-element-dropdown";
import { Districts } from "../component/district";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SearchPersonListingScreen({ navigation }) {
  const {
    subCategories,
    userData,
    livedistrict,
    coords,
    setCoords,
    lpermission,
    setLpermission,
  } = useContext(AppContext);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionTouched, setSuggestionsTouched] = useState(false);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [live, setLive] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const popup = createRef();

  const [citiesList, setCitiesList] = useState(Districts);
  const [filter, setFilter] = useState({ city: userData?.user_district });
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        getData();
        //Put your Data loading function here instead of my loadData()
        return unsubscribe;
      },
      [navigation]
    );

    return unsubscribe;
  }, [navigation]);
  async function getData() {
    const num = await AsyncStorage.getItem("user_contact");
    if (num == null) {
      setFilter({ city: null });
    } else {
      setFilter({ city: userData?.user_district });
    }
  }
  const getPeopleList = async ({ skill = value, location = filter.city }) => {
    console.log("ok");
    const res = await axiosInstance.post("/sp/getSearchedSp/", {
      skill: skill,
      city: location,
      GIVEN_API_KEY: API_KEY,
    });
    if (res.data.data.length > 0) {
      setSearchData(res.data.data);
    } else {
      setSearchData(null);
    }
  };

  const handleSearchText = (text) => {
    setValue(text);
    setSearchData([]);
    if (text.length > 1) {
      const filterSuggestions = subCategories.filter(
        (suggestion) =>
          suggestion.subCat_name.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.gray200,
        marginTop: 8,
      }}
    >
      <SafeAreaView>
        <View style={{ marginHorizontal: 20 }}>
          <Search
            containerStyle={{ padding: 0 }}
            rightIcon={"equalizer-fill"}
            onBlur={() => setSuggestionsTouched(true)}
            onRightIconPress={() => popup.current.show()}
            // onFocus={() => setSearching(true)}
            value={value}
            onChangeText={handleSearchText}
            onSubmitEditing={() => {
              setSuggestions([]);
              getPeopleList({});
              setSuggestionsActive(false);
            }}
          />
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            style={{
              marginTop: 5,
              paddingHorizontal: 24,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text>{filter?.city}</Text>
            {livedistrict ? (
              filter?.city == livedistrict ? (
                <Text
                  style={{
                    position: "absolute",
                    right: 0,
                    marginRight: 24,
                    color: Colors.primary,
                    fontFamily: "Regular",
                    textDecorationLine: "underline",
                  }}
                  onPress={() => {
                    setLive(true);
                    setFilter({ city: userData?.user_district });
                    getPeopleList({ location: userData?.user_district });
                  }}
                >
                  Current Location Enabled
                </Text>
              ) : (
                <Text
                  style={{
                    position: "absolute",
                    right: 0,
                    marginRight: 24,
                    color: Colors.primary,
                    fontFamily: "Regular",
                    textDecorationLine: "underline",
                  }}
                  onPress={async () => {
                    if (lpermission == "true") {
                      setLive(true);
                      setFilter({ city: livedistrict });
                      getPeopleList({ location: livedistrict });
                    } else {
                      alert("Please allow Location access and restart the app");
                      setTimeout(() => {
                        Linking.openSettings();
                      }, 2000);

                      setLive(false);
                      setFilter({ city: filter?.city });
                    }
                  }}
                >
                  Use Your current location ?
                </Text>
              )
            ) : null}
          </View>
          {/* Suggestions */}
          {suggestionsActive && (
            <View
              style={{
                marginTop: 16,
                backgroundColor: Colors.white,
                marginBottom: 20,
              }}
            >
              <ScrollView keyboardShouldPersistTaps={"handled"}>
                {suggestions.map((item, index) => {
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
                        setSuggestions([]);
                        setValue(item.subCat_name);
                        setSuggestionsActive(false);
                        getPeopleList({ skill: item.subCat_name });
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
          {searchData && !suggestionsActive && value.length > 0 && (
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
                      subcat={value}
                      verified={person.sp_verified}
                      name={person.sp_name}
                      sp_contact={person.sp_contact}
                      image={person.sp_profileImage}
                      address={person.sp_city + " " + person.sp_district}
                      rating={5}
                      ratingcount={5}
                      onPress={() => navigation.navigate("Sp", { sp: person })}
                    />
                  </View>
                );
              })}
            </ScrollView>
          )}
          {/* notfound */}
          {!searchData && !suggestionsActive && value.length > 1 && (
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
                  source={require("../assets/images/not.png")}
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
                  Sorry, the keyword you entered cannot be found, please check
                  again or search with another keyword.
                </Text>
              </View>
            </View>
          )}
          <ModalPopup
            ref={popup}
            animationType="fade"
            onTouchOutside={() => popup.current.close()}
          >
            <View
              style={{
                // paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            >
              <Text
                style={{ fontSize: 28, fontFamily: "Black", marginBottom: 16 }}
              >
                Search Filter
              </Text>
              <View
                style={{
                  marginTop: 12,
                }}
              >
                <Text>District *</Text>
                <Dropdown
                  style={{
                    width: "100%",
                    marginTop: 8,
                    marginRight: -10,
                    borderWidth: 1,
                    padding: 16,
                    borderRadius: 4,
                    height: 50,
                    borderColor: Colors.black,
                  }}
                  placeholderStyle={{ color: Colors.gray900, fontSize: 14 }}
                  data={citiesList ? citiesList : []}
                  labelField="label"
                  valueField="label"
                  placeholder={"Select item"}
                  search
                  searchPlaceholder="Search..."
                  value={filter.city}
                  onChange={(item) => {
                    setFilter({ ...filter, city: item.label });
                    getPeopleList({ location: item.label });
                    setSuggestionsActive(false);
                  }}
                />
              </View>
            </View>
          </ModalPopup>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
