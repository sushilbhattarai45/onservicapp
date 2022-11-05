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
  const { user, logged, setUser, setLogged } = useContext(AppContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
      //Put your Data loading function here instead of my loadData()
    });

    async function getData() {
      const user_data = await AsyncStorage.getItem("user_contact");
      if (user_data) {
        let res = await axiosInstance.post("/user/getOneUser", {
          GIVEN_API_KEY: "AXCF",
          user_contact: user_data,
        });
        if (!res.error) {
          setUserData(res.data);
          console.log(user);
        } else {
          console.error(res.error);
        }
      } else {
        navigation.navigate("Login");
      }
    }
  }, []);

  const [userData, setUserData] = useState();
  return (
    <ScrollView>
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
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 24,
                fontWeight: "800",
                letterSpacing: -0.02,
                color: Colors.white,
              }}
              onPress={async () => {
                await AsyncStorage.removeItem("user_contact");
                setUser(null);
                setLogged("false");
                navigation.navigate("Home");
              }}
            >
              Profile
            </Text>
            <View
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                    // uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jsv4q2x08j9-22%3A191?alt=media&token=2b0aea99-e4d3-49da-ace4-e9d81a9756df",
                    uri: userData?.data.user_profileImage,
                  }}
                />
                <Icon
                  onPress={() => {}}
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                  }}
                  name="add-circle-fill"
                  size={28}
                  color="white"
                />
              </View>

              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "Bold",
                    marginLeft: 24,
                  }}
                >
                  {userData?.data.user_name}{" "}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: "Regular",

                    marginLeft: 17,
                    fontSize: 15,
                    color: Colors.white,
                  }}
                >
                  {" "}
                  <Ionicons
                    name="ios-location-sharp"
                    size={20}
                    style={{}}
                    color="white"
                  />{" "}
                  {userData?.data.user_city + " " + userData?.data.user_street}{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    marginLeft: 17,
                    fontSize: 15,
                    fontFamily: "Regular",

                    color: Colors.white,
                  }}
                >
                  {"  "}
                  <FontAwesome name="phone" size={20} color="white" />
                  {"  "}
                  {userData?.data.user_contact}
                  {"  "}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
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
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Regular",

                    fontSize: 12,
                    color: Colors.gray900,
                  }}
                >
                  Phone Number
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    paddingLeft: 0,
                    borderColor: Colors.black,
                    borderRadius: 4,
                    height: 35,
                    color: Colors.black,
                    fontFamily: "Regular",

                    fontSize: 15,
                  }}
                  value={userData?.data.user_contact}
                  read
                />
                {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
              </View>
              <View
                style={{
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Regular",

                    color: Colors.gray900,
                  }}
                >
                  City
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: "100%",
                    fontFamily: "Regular",

                    borderBottomWidth: 1,
                    paddingLeft: 0,
                    borderColor: Colors.black,
                    borderRadius: 4,
                    height: 35,
                    fontSize: 15,
                    color: Colors.black,
                  }}
                  value={userData?.data.user_city}
                  read
                  // placeholder="Re-Enter Your PIN"
                />
                {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
              </View>
              <View
                style={{
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Regular",

                    fontSize: 12,
                    color: Colors.gray900,
                  }}
                >
                  Street
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    paddingLeft: 0,
                    borderColor: Colors.black,
                    borderRadius: 4,
                    height: 35,
                    fontFamily: "Regular",

                    fontSize: 15,
                    color: Colors.black,
                  }}
                  value={userData?.data.user_street}
                  read
                  // placeholder="Re-Enter Your PIN"
                />
                {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
              </View>
              <View
                style={{
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Regular",

                    color: Colors.gray900,
                  }}
                >
                  Gender
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: "100%",
                    fontFamily: "Regular",
                    borderBottomWidth: 1,
                    paddingLeft: 0,
                    borderColor: Colors.black,
                    color: Colors.black,
                    borderRadius: 4,
                    height: 35,
                    fontSize: 15,
                  }}
                  value={userData?.data.user_gender}
                  read
                  // placeholder="Re-Enter Your PIN"
                />
                {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
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
