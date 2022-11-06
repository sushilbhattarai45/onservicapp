import { React, useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Colors } from "../../styles/main";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../component/Header";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { number } from "yup";
import AppContext from "../../component/appContext";
import { axiosInstance } from "../../component/tools";
export default function LoginScreen({ navigation, route, path }) {
  const nav = useNavigation();
  const { user, logged, setLogged, setUser, setUserData } =
    useContext(AppContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [num, setNum] = useState();
  const [pin, setPin] = useState();

  const [focuscolor1, setFocusColor1] = useState(Colors.black);
  const [focuscolor2, setFocusColor2] = useState(Colors.black);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const showHeader = path == "NotLoggedIn" ? false : true;
  async function checkLogin() {
    // alert(Number.isInteger(num));
    if (pin.length != 4 || num.length != 10) {
      // if (Number.isInteger(pin) == false || Number.isInteger(num) == false) {
      //   if (Number.isInteger(pin) == false) {
      //     setError2("Please Enter A Valid Pin");
      //     setFocusColor2("red");
      //   }
      // } else
      if (pin.length != 4 && num.length != 10) {
        setError1("Please enter a valid Phone Number");
        setError2("Please enter a valid OTP");
        setFocusColor2("red");
        setFocusColor1("red");
      } else if (pin.length != 4) {
        setError2("Please enter a valid OTP");
        setFocusColor2("red");
      } else {
        setError1("Please enter a valid Phone Number");
        setFocusColor1("red");
      }
    } else {
      const res = await axiosInstance.post("/user/login", {
        GIVEN_API_KEY: "AXCF",
        user_num: num,
        user_pass: pin,
      });
      const status = res?.data?.statuscode;
      console.log(res);
      if (status == 200 || status == 201) {
        await AsyncStorage.setItem("user_contact", num);
        setUser(num);
        const setdata = await axiosInstance.post("/user/getOneUser", {
          GIVEN_API_KEY: "AXCF",
          user_contact: num,
        });
        alert(setdata?.data.data.user_name);
        setUserData(setdata?.data?.data);
        setLogged("true");
        navigation.navigate("Home");
        alert("done");
      } else {
        setFocusColor2("red");
        setFocusColor1("red");
        setError2("Username Password not matched");
      }
    }
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: !showHeader ? Constants.statusBarHeight + 16 : 0 },
      ]}
    >
      {showHeader && (
        <Header
          icon={"arrow-left-line"}
          onPressIcon={() => navigation.goBack()}
        />
      )}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 0.1}>
        {/* <ImageSliderComponent/> */}
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Regular",
              fontStyle: "800",
              fontWeight: "bold",
              fontSize: 32,
              lineHeight: 38,
              display: "flex",
              alignItems: "flex-end",
              letterSpacing: -0.02,

              color: "#212121",
            }}
          >
            {showHeader ? "Login" : "Please Login First"}
          </Text>
          <View
            style={{
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",
              }}
            >
              Phone Number
            </Text>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              style={{
                fontFamily: "Regular",

                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor1,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setNum(value);
                setError1("");
                setFocusColor1(Colors.primary);
              }}
              placeholder="Phone Number"
            />

            {error1 ? (
              <Text
                style={{
                  fontFamily: "Regular",

                  color: "red",
                }}
              >
                {error1}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text style={{ fontFamily: "Regular" }}>Password</Text>
            <TextInput
              maxLength={4}
              keyboardType="numeric"
              style={{
                fontFamily: "Regular",

                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor2,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setPin(value);
                setFocusColor1(Colors.primary);
                setError2("");
                setFocusColor2(Colors.primary);
              }}
              placeholder="Enter Your Pin"
            />

            {error2 ? (
              <Text
                style={{
                  color: "red",
                }}
              >
                {error2}
              </Text>
            ) : null}
          </View>
          {/* {error1 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "red",
            }}
          >
            {error1}
          </Text>
        ) : null} */}
          <View
            style={{
              position: "relative",
              marginTop: 12,
              flexDirection: "row",
            }}
          >
            <CheckBox
              value={toggleCheckBox}
              onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
              color={toggleCheckBox ? Colors.primary : undefined}
            />
            <Text style={{ marginLeft: 12, fontFamily: "Regular" }}>
              Remember me
            </Text>
            <Text
              style={{ position: "absolute", fontFamily: "Regular", right: 12 }}
            >
              Forgot PIN?
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <Pressable
            style={{
              borderColor: Colors.primary,
              borderWidth: 1,
              justifyContent: "center",
              height: 50,
            }}
            onPress={() => checkLogin()}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.primary,
                fontFamily: "Regular",
                textAlignVertical: "center",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Text
            style={{ marginTop: 8, fontFamily: "Regular", textAlign: "center" }}
          >
            Dont Have an account?
            <Text
              onPress={() => nav.navigate("Signup")}
              style={{
                color: Colors.primary,
              }}
            >
              {" "}
              Register{" "}
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray200,
    padding: 24,
    flex: 1,
  },
});
