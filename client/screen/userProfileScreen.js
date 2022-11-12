import { React, useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Colors } from "../styles/main";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import PeopleNearYou from "../component/peopleNearYou";
import { axiosInstance } from "../component/tools";
import Constants from "expo-constants";
import axios from "axios";
import AppContext from "../component/appContext";
import Icon from "../component/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function UserProfileScreen({ navigation }) {
  const { setUser, setLogged, userData, user, setUserData, isitsp, setIsitSp } =
    useContext(AppContext);
  return (
    <ScrollView style={{ backgroundColor: Colors.gray200 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: Colors.primary,
          flexDirection: "column",
        }}
      >
        <View style={{ zIndex: 10 }}>
          <View
            style={{
              marginTop: Constants.statusBarHeight + 20,
              marginLeft: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 24,
                    fontWeight: "800",
                    letterSpacing: -0.02,
                    color: Colors.white,
                  }}
                >
                  Profile
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  marginRight: 20,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 2,
                }}
              >
                <Icon
                  onPress={() => navigation.navigate("UpdateUser")}
                  style={{
                    marginRight: 20,
                  }}
                  name="pencil-fill"
                  size={24}
                  color="white"
                />
                <Icon
                  style={{
                    marginRight: 20,
                  }}
                  onPress={async () => {
                    if (isitsp) {
                      const res = await axiosInstance.post("sp/getOneSp", {
                        GIVEN_API_KEY: "AXCF",
                        sp_contact: user,
                      });
                      navigation.navigate("Sp", { sp: res?.data.data });
                    } else {
                      console.log("hi");
                      navigation.navigate("BecomeSP");
                    }
                  }}
                  name="shield-user-fill"
                  size={24}
                  color="white"
                />
                <Icon
                  onPress={async () => {
                    await AsyncStorage.removeItem("user_contact");
                    setUser(null);
                    setLogged("false");
                    setUserData(null);
                    setIsitSp(null);

                    navigation.navigate("Home");
                  }}
                  name="logout-box-r-line"
                  size={24}
                  color="white"
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                overflow: "visible",
              }}
            >
              <View style={{ overflow: "visible" }}>
                <Image
                  style={{
                    width: 120,
                    borderRadius: 20,
                    height: 120,
                  }}
                  source={{
                    uri: userData?.user_profileImage,
                  }}
                />
              </View>

              <View style={{ marginBottom: 40 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontFamily: "Bold",
                    marginLeft: 24,
                  }}
                >
                  {userData?.user_name}{" "}
                </Text>
                {/* {/* <Text
                  style={{
                    marginTop: 4,
                    fontFamily: "Regular",

                    marginLeft: 17,
                    fontSize: 15,
                    color: Colors.white,
                  }}
                >
                  <Ionicons
                    name="ios-location-sharp"
                    size={20}
                    style={{}}
                    color="white"
                  />{" "}
                  {userData?.user_city + " " + userData?.user_street}{" "}
                </Text> */}
                {/* <View
                  style={{
                    marginTop: 4,
                    marginLeft: 24,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon name="phone-fill" size={20} color="white" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Regular",
                      color: Colors.white,
                    }}
                  >
                    {"  "}
                    {userData?.user_contact}
                    {"  "}
                  </Text>
                </View> */}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: Colors.gray200,
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
            marginTop: -30,
          }}
        >
          <View
            style={{
              paddingHorizontal: 24,
              marginTop: 54,
            }}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: 20,
                argimnLeft: 4,
                fontFamily: "Regular",
              }}
            >
              General Information
            </Text>

            <View>
              <View
                style={{
                  paddingTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="phone-fill" size={20} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 18 }}>{userData?.user_contact}</Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="home-6-fill" size={20} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 18 }}>{userData?.user_street}</Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="map-pin-2-fill"
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18 }}>{userData?.user_city}</Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="building-4-fill"
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18 }}>{userData?.user_district}</Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  name={
                    userData?.user_gender == "Male"
                      ? "men-line"
                      : userData?.user_gender == "Female"
                      ? "women-line"
                      : "genderless-line"
                  }
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18 }}>{userData?.user_gender}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: 20,
                  lineHeight: 38,
                  display: "flex",
                  alignItems: "flex-end",
                  letterSpacing: -0.02,
                }}
              >
                People Near You{" "}
              </Text>
              <View>
                {/* <FlatList
                  style={{
                    marginTop: 12,
                  }}
                  //   style={styles.videos_flatList}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={Persons}
                  renderItem={({ item }) => (
                    <PeopleNearYou
                      name={item.name}
                      number={item.number}
                      image={item.img}
                      works={item.works}
                    />
                  )}
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
                /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
