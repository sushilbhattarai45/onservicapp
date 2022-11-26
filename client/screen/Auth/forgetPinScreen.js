import { react, useState, useRef, useEffect } from "react";
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
import { getSms } from "../../component/tools.js";
import AntDesign from "react-native-vector-icons/AntDesign";
import { axiosInstance } from "../../component/tools";
import { Colors } from "../../styles/main";
import Header from "../../component/Header";
import { useNavigation } from "@react-navigation/native";
export default function ForgetPinScreen() {
  const [numval, setNumVal] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        setNumVal(null);
        return unsubscribe;
      },
      [navigation]
    );
  });
  async function forget() {
    if (num.length == 10) {
      const check = await axiosInstance.post("/user/getOneUser", {
        GIVEN_API_KEY: "AXCF",
        user_contact: num,
      });
      if (check?.data.statuscode == 201) {
        // const otp = Math.floor(Math.random() * 10000);
        let genOtp = Math.floor(1000 + Math.random() * 9000);
        console.log(genOtp);
        getSms(genOtp, num);

        navigation.navigate("OtpScreen", {
          num: num,
          otp: genOtp,
          type: "forget",
          values: null,
          img: null,
        });
      } else {
        alert("User Not Found");
      }
    } else {
      alert("Invalid Number");
    }
  }

  function getOtp() {
    let pin = Math.round(Math.random() * 10000);
    let pinStr = pin + "";

    // make sure that number is 4 digit
    if (pinStr.length == 6) {
      return pinStr;
    } else {
      return getPin();
    }
  }
  const [num, setNum] = useState();
  return (
    <View>
      <View
        style={{
          marginLeft: 24,
          marginTop: 8,
        }}
      >
        <Header
          icon={"arrow-left-line"}
          onPressIcon={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          margin: 30,
        }}
      >
        <View style={{}}>
          <Text
            value={numval}
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
            Forgot PIN?{" "}
          </Text>
          <View>
            <Text style={{ color: Colors.gray900, fontFamily: "Regular" }}>
              Enter your regestered number below to get an one time password{" "}
            </Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <View
              style={{
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                }}
              >
                Phone Number{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  maxLength={10}
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
                  onEndEditing={(value) => {
                    setNum(value);
                  }}
                  onChangeText={(value) => {
                    setNum(value);
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
            onPress={async () => await forget()}
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
              SEND
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
