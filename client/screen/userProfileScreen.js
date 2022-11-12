import { React, useEffect, useState, useContext, createRef } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Pressable,
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
import Button from "../component/buttonComponent";
import ModalPopup from "../component/Modal";
export default function UserProfileScreen({ navigation }) {
  const { setUser, setLogged, userData, user, setUserData, isitsp, setIsitSp } =
    useContext(AppContext);
  const popup = createRef();
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

                <View
                  style={{
                    marginTop: 4,
                    marginLeft: 24,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon name="map-pin-2-fill" size={20} color="white" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Regular",
                      color: Colors.white,
                    }}
                  >
                    {"  "}
                    {userData?.user_city + " " + userData?.user_street} {"  "}
                  </Text>
                </View>
                <View
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
                </View>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <Pressable
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  marginRight: 12,
                  paddingHorizontal: 16,
                  borderRadius: 4,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderStyle: "solid",
                  borderColor: Colors.primary,
                  height: 40,
                }}
                onPress={() => navigation.navigate("UpdateUser")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "SemiBold",
                    fontWeight: "600",
                    color: Colors.primary,
                    textAlign: "center",
                    justifyContent: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Edit User
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  marginRight: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 4,
                  backgroundColor: Colors.gray500,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
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
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Bold",
                    fontWeight: "600",
                    color: Colors.white,
                    textAlign: "center",
                    justifyContent: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {isitsp ? "SP Screen" : "BEcome SP"}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 4,
                  backgroundColor: Colors.gray500,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => popup.current.show()}
              >
                <Icon
                  name="more-fill"
                  size={22}
                  color={Colors.white}
                  style={{
                    color: Colors.white,
                  }}
                />
              </Pressable>
            </View>
            <Text
              style={{
                color: Colors.black,
                fontSize: 20,
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
                <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                  {userData?.user_contact}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="home-6-line" size={20} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                  {userData?.user_street}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="map-pin-2-line"
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                  {userData?.user_city}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="building-4-line"
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                  {userData?.user_district}
                </Text>
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
                <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                  {userData?.user_gender}
                </Text>
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
            <ModalPopup
              ref={popup}
              animationType="slide"
              containerStyle={{
                width: "100%",
                marginTop: "auto",
                // alignItems: "center",
                borderTopStartRadius: 32,
                borderTopEndRadius: 32,
                // marginTop:24
              }}
              onTouchOutside={() => popup.current.close()}
            >
              <View
                style={{
                  width: 50,
                  height: 2.5,
                  backgroundColor: Colors.black,
                  borderRadius: 5,
                  marginBottom: 24,
                  alignSelf: "center",
                }}
              />
              <View style={{ justifyContent: "center", width: "100%" }}>
                <Pressable
                  style={{
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("UpdateUser")}
                >
                  <Icon name="edit-fill" size={20} style={{ marginRight: 8 }} />
                  <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                    Edit User
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopColor: Colors.black,
                    borderTopWidth: StyleSheet.hairlineWidth,
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
                >
                  <Icon
                    name="shield-user-fill"
                    size={20}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                    {isitsp ? "Go to SP Screen" : "Be Our Partner"}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopColor: Colors.black,
                    borderTopWidth: StyleSheet.hairlineWidth,
                  }}
                  onPress={async () => {
                    console.log("HI");
                    await AsyncStorage.removeItem("user_contact");
                    setUser(null);
                    setLogged("false");
                    setUserData(null);
                    setIsitSp(null);

                    navigation.navigate("Home");
                  }}
                >
                  <Icon
                    name="logout-box-r-line"
                    size={20}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 18, fontFamily: "Regular" }}>
                    Logout
                  </Text>
                </Pressable>
              </View>
            </ModalPopup>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
