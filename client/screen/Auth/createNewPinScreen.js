import { react, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Colors } from "../../styles/main";
import Header from "../../component/Header";

export default function CreateNewPinScreen() {
  return (
    <View>
      <View
        style={{
          marginLeft: 24,
        }}
      >
        <Header icon={"arrow-left-line"} />
      </View>
      <View
        style={{
          margin: 24,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: "Regular",
              fontStyle: "normal",
              fontWeight: "800",
              fontSize: 20,
              lineHeight: 38,
              display: "flex",
              alignItems: "flex-end",
              letterS: -0.02,

              color: Colors.black,
            }}
          >
            Create new PIN
          </Text>
          <View>
            <Text style={{ color: Colors.gray500, fontFamily: "Regular" }}>
              Enter New Pin for the given Number: 984600000{" "}
            </Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                }}
              >
                PIN{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  maxLength={4}
                  style={{
                    fontFamily: "Regular",

                    width: "100%",
                    marginTop: 8,
                    borderWidth: 1,
                    padding: 16,
                    borderColor: Colors.black,
                    borderRadius: 4,
                    height: 50,
                  }}
                  placeholder="Enter your New PIN"
                />
                <Ionicons
                  style={{
                    position: "absolute",
                    paddingVertical: 20,
                    right: 16,
                  }}
                  name="eye-off-outline"
                  size={24}
                  color="black"
                />
              </View>
              {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
            </View>
          </View>
          <View>
            <View
              style={{
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                }}
              >
                {" "}
                Confirm PIN
              </Text>

              {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
            </View>
            <View
              style={{
                display: "flex",
              }}
            >
              <TextInput
                keyboardType="numeric"
                maxLength={4}
                style={{
                  fontFamily: "Regular",

                  width: "100%",
                  marginTop: 8,
                  borderWidth: 1,
                  padding: 16,
                  borderColor: Colors.black,
                  borderRadius: 4,
                  height: 50,
                }}
                placeholder="Confirm PIN"
              />
              <Ionicons
                style={{ position: "absolute", paddingVertical: 20, right: 16 }}
                name="eye-off-outline"
                size={24}
                color="black"
              />
            </View>
          </View>

          <Pressable
            style={{
              borderColor: Colors.primary,
              borderWidth: 1,
              justifyContent: "center",
              height: 50,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",

                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.primary,
                fontFamily: "Bold",
                textAlignVertical: "center",
              }}
            >
              CREATE
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
