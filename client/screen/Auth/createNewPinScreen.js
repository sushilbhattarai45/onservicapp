import { react, useState, useRef, createRef } from "react";
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
import { axiosInstance } from "../../component/tools";
import ModalPopup from "../../component/Modal";
import { ref } from "yup";
import tick from "../../assets/images/tick.png";
import { SafeAreaView } from "react-native-safe-area-context";
export default function CreateNewPinScreen({ navigation, route }) {
  const popup = createRef();

  const { num } = route.params;
  const [first, setFirst] = useState("");
  const [error, setError] = useState({ first: null, second: null });

  const [second, setSecond] = useState("");
  async function setPin() {
    if (first.length == 6 && second.length == 6) {
      if (first == second) {
        const updatePin = await axiosInstance.post("/user/forgetPin", {
          GIVEN_API_KEY: "AXCF",
          user_contact: num,
          user_password: first,
        });
        if (updatePin?.data.statuscode == 201) {
          // alert("done");
          popup.current.show();
        }
      } else {
        setError({ second: "Password Not matched" });
      }
    } else {
      if (first.length !== 4) {
        setError({ first: "Password Must be of Six digit" });
      } else {
        setError({ second: "Password Must be of Six digit" });
      }
    }
  }
  return (
    <View>
      <SafeAreaView>
        <ModalPopup
          ref={popup}
          animationType="fade"
          onTouchOutside={() => popup.curren + t.close()}
        >
          <View style={styles.toppopupview}>
            <Image
              style={styles.popupimage}
              source={require("../../assets/images/tick.png")}
            />
            <View style={styles.popuptext}>
              <Text style={styles.popupmaintext}>Changed</Text>
              <Text style={styles.popupsecondarytext}>
                You have successfully Changed your Password
              </Text>
            </View>
            <View style={styles.Button}>
              <Text
                onPress={() => navigation.navigate("Home")}
                style={styles.Txt566}
              >
                ok
              </Text>
            </View>
          </View>
        </ModalPopup>
        <View
          style={{
            marginLeft: 24,
          }}
        >
          <Header
            icon={"arrow-left-line"}
            onPressIcon={() => navigation.goBack()}
          />
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
              Create new Password
            </Text>
            <View>
              <Text style={{ color: Colors.gray900, fontFamily: "Regular" }}>
                Enter New Password for the given Number: {num}{" "}
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
                  Password{" "}
                </Text>
                <View
                  style={{
                    display: "flex",
                  }}
                >
                  <TextInput
                    maxLength={6}
                    style={{
                      fontFamily: "Regular",
                      fontSize: 15,
                      width: "100%",
                      marginTop: 8,
                      borderWidth: 1,
                      padding: 16,
                      borderColor: Colors.black,
                      borderRadius: 4,
                      height: 50,
                    }}
                    placeholder="Enter your New Password"
                    onChangeText={(value) => {
                      setError({ first: null });

                      setFirst(value);
                    }}
                  />

                  {/* <Ionicons
                
                  style={{
                    position: "absolute",
                    paddingVertical: 20,
                    right: 16,
                  }}
                  name="eye-off-outline"
                  size={24}
                  color="black"
                /> */}
                </View>
                {error.first ? (
                  <Text style={{ color: "red" }}>{error.first}</Text>
                ) : null}
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
                  Confirm Password
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                }}
              >
                <TextInput
                  maxLength={6}
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
                  onChangeText={(value) => {
                    setError({ second: null });
                    setSecond(value);
                  }}
                  placeholder="Confirm Password"
                />
                {/* <Ionicons
                style={{ position: "absolute", paddingVertical: 20, right: 16 }}
                name="eye-off-outline"
                size={24}
                color="black"
              /> */}
              </View>
              {error.second ? (
                <Text style={{ color: "red" }}>{error.second}</Text>
              ) : null}
            </View>

            <Pressable
              onPress={async () => await setPin()}
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
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  toppopupview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  popupimage: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  popuptext: {
    display: "flex",
    fontFamily: "Regular",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 24,
  },
  popupmaintext: {
    fontSize: 32,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "800",
    letterSpacing: -0.64,
    color: "rgba(33,33,33,1)",
    marginBottom: 15,
  },
  popupsecondarytext: {
    fontSize: 16,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "400",
    letterSpacing: -0.32,
    color: Colors.gray900,
    textAlign: "center",
    justifyContent: "center",
  },

  Button: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 23,
    paddingRight: 23,
    marginBottom: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(45,143,247,1)",
  },
  Txt566: {
    fontSize: 20,
    fontFamily: "Regular",
    fontWeight: "700",
    letterSpacing: -0.4,
    color: "rgba(45,143,247,1)",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },

  popupskip: {
    fontSize: 14,
    fontFamily: "Regular",
    fontWeight: "400",
    color: "rgba(51,51,51,1)",
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
});
