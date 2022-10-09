import { React, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Colors } from "../styles/main";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function UserProfileScreen() {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          display: "flex",

          flexDirection: "column",
        }}
      >
        <View
          style={{
            flex: 1.9,

            backgroundColor: Colors.primary,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <View
            style={{
              paddingBottom: 20,
              marginTop: 50,
              marginLeft: 30,
            }}
          >
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Black",
                fontStyle: "normal",
                fontSize: 20,
                lineHeight: 38,
                display: "flex",
                alignItems: "flex-end",
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
                    marginLeft: 24,
                  }}
                >
                  Shakuntala Pandey{" "}
                </Text>
                <Text
                  style={{
                    marginTop: 4,

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
                  Butwal 12 Lalyang
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    marginLeft: 17,
                    fontSize: 15,
                    color: Colors.white,
                  }}
                >
                  {"  "}
                  <FontAwesome name="phone" size={20} color="white" />
                  {"  "}
                  90800000000{"  "}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", flex: 3, backgroundColor: "white" }}>
          <View
            style={{
              margin: 30,
            }}
          >
            <Text style={{ color: Colors.black, fontSize: 20, argimnLeft: 4 }}>
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

                    fontSize: 15,
                  }}
                  value="9742993345"
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
                    color: Colors.gray900,
                  }}
                >
                  City
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
                    fontSize: 15,
                    color: Colors.black,
                  }}
                  value="Kathmandu"
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
                    fontSize: 15,
                    color: Colors.black,
                  }}
                  value="Baneshwor"
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
                    color: Colors.gray900,
                  }}
                >
                  Gender
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    paddingLeft: 0,
                    borderColor: Colors.black,
                    color: Colors.black,
                    borderRadius: 4,
                    height: 35,
                    fontSize: 15,
                  }}
                  value="Male"
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
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
