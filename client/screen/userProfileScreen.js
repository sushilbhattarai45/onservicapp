import { React, useEffect, useState } from "react";
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

export default function UserProfileScreen() {
  useEffect(() => {
    async function getData() {
      let res = await axiosInstance.post("/user/getOneUser", {
        GIVEN_API_KEY: "AXCF",
        user_contact: 123456780,
      });
      if (!res.error) {
        setUser(res.data);
        console.log(user);
      } else {
        console.error(res.error);
      }
    }
    getData();
  }, []);

  const Persons = [
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
  const [user, setUser] = useState();
  return (
    <ScrollView style={{ backgroundColor: Colors.gray200 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: Colors.gray200,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flex: 1.5,
            backgroundColor: Colors.primary,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <View
            style={{
              marginTop: Constants.statusBarHeight + 20,

              paddingBottom: 20,
              marginLeft: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Black",
                fontStyle: "normal",
                fontSize: 32,
                letterSpacing: -0.02,
                color: Colors.white,
              }}
            >
              Profile{" "}
            </Text>
            <View
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{}}>
                <Image
                  style={{
                    width: 100,
                    borderRadius: 20,
                    height: 100,
                  }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jsv4q2x08j9-22%3A191?alt=media&token=2b0aea99-e4d3-49da-ace4-e9d81a9756df",
                  }}
                />
                <AntDesign
                  onPress={() => {}}
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                  }}
                  name="pluscircle"
                  size={28}
                  color="white"
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "Regular",
                    marginLeft: 24,
                  }}
                >
                  {user?.data.user_name}{" "}
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
                  {user?.data.user_city + " " + user?.data.user_street}{" "}
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
                  {user?.data.user_contact}
                  {"  "}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ display: "flex", flex: 3, backgroundColor: Colors.gray200 }}
        >
          <View
            style={{
              margin: 30,
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
                  value={user?.data.user_contact}
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
                  value={user?.data.user_city}
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
                  value={user?.data.user_street}
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
                  value={user?.data.user_gender}
                  read
                  // placeholder="Re-Enter Your PIN"
                />
                {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
              </View>
            </View>
            <View
              style={{
                marginLeft: 0,
                marginTop: 10,
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
                <FlatList
                  style={{
                    marginTop: 15,
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
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
