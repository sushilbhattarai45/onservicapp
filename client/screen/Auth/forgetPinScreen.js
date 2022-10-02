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

export default function ForgetPinScreen() {
  return (
    <View
      style={{
        margin: 30,
      }}
    >
      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            marginTop: 30,
            fontFamily: "Urbanist",
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
          Forgot PIN?{" "}
        </Text>
        <View>
          <Text style={{ color: Colors.gray500 }}>
            Enter your regestered number below to get an one time password{" "}
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text>Phone Number </Text>
            <View
              style={{
                display: "flex",
              }}
            >
              <TextInput
                keyboardType="numeric"
                maxLength={10}
                style={{
                  width: "100%",
                  marginTop: 8,
                  borderWidth: 1,
                  padding: 16,
                  borderColor: Colors.black,
                  borderRadius: 4,
                  height: 50,
                }}
                placeholder="Enter your Mobile Number"
              />
              {/* <Ionicons
                style={{ position: "absolute", paddingVertical: 20, right: 16 }}
                name="eye-off-outline"
                size={24}
                color="black"
              /> */}
            </View>
            {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
          </View>
        </View>
        <View>
          {/* <View
            style={{
              display: "flex",
            }}
          >
            <TextInput
              style={{
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
          </View> */}
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
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.primary,
              fontFamily: "Urbanist",
              textAlignVertical: "center",
            }}
          >
            SEND
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
