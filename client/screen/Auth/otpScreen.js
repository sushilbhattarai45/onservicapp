import {
  useRef,
  React,
  useState,
  createRef,
  useEffect,
  useCallback,
  useContext,
} from "react";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import moment from "moment";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import ModalPopup from "../../component/Modal";
import Header from "../../component/Header";
import { BASE_OUR_API_URL } from "../../component/tools";
import { axiosInstance } from "../../component/tools";
import { Colors } from "../../styles/main";
import AppContext from "../../component/appContext";
export default function OtpScreen({ navigation, route }) {
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const max = 1;
  const popup = createRef();
  const { otp, num, type, values, img } = route.params;
  const firstTextInputRef = useRef(null);
  const [secondTextInputValue, setSecondTextInputValue] = useState(null);
  const [firstTextInputValue, setFirstTextInputValue] = useState(null);
  const [thirdTextInputValue, setThirdTextInputValue] = useState(null);
  const [fourthTextInputValue, setFourthTextInputValue] = useState(null);
  const [focuscolor1, setFocusColor1] = useState(Colors.black);
  const [focuscolor2, setFocusColor2] = useState(Colors.black);
  const [focuscolor3, setFocusColor3] = useState(Colors.black);
  const [data, setData] = useState();

  const [focuscolor4, setFocusColor4] = useState(Colors.black);
  const { userData, logged, user, setUserData, setLogged, setUser, setIsitSp } =
    useContext(AppContext);
  const onFocus = (id) => {
    if (id == 1) setFocusColor1(Colors.primary);
    if (id == 2) setFocusColor2(Colors.primary);
    setFocusColor1(Colors.primary);
    if (id == 3) setFocusColor3(Colors.primary);
    setFocusColor1(Colors.primary);
    if (id == 4) setFocusColor4(Colors.primary);
  };
  useEffect(() => {});
  const deFocus = (id) => {
    if (id == 1) setFocusColor1(Colors.black);
    if (id == 2) setFocusColor2(Colors.black);
    setFocusColor1(Colors.primary);
    if (id == 3) setFocusColor3(Colors.black);
    setFocusColor1(Colors.primary);
    if (id == 4) setFocusColor4(Colors.black);
  };
  const checkotp = async (fourth) => {
    const givenotp =
      firstTextInputValue +
      secondTextInputValue +
      thirdTextInputValue +
      fourthTextInputValue;
    // alert(givenotp);
    if (givenotp == otp) {
      if (type == "forget") {
        navigation.navigate("CreateNewPin", {
          num: num,
        });
      } else {
        let response = await axios.post(
          BASE_OUR_API_URL + "/v1/api/user/register",
          {
            API_KEY: "AXCF",
            user_name: values.name,
            user_email: values.email,
            user_contact: values.phone,
            user_district: values.district,
            user_city: values.city,
            user_street: values.street,
            user_gender: values.gender,
            user_password: values.password,
            user_profileImage: img,
            user_toc: {
              date: moment().format("ll"),
              time: moment().format("LT"),
            },
          }
        );
        const finaldata = response?.data?.user;
        setData(finaldata);
        setUserData(finaldata);
        setLogged("true");
        setIsitSp(null);
        setUser(values.phone);
        await storeData(values.phone);
        navigation.navigate("Home");

        navigation.navigate("Home");
      }
      // popup.current.show();
    } else {
      alert("Invalid Otp");
    }
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("user_contact", value);
    } catch (e) {}
  };
  return (
    <View style={{ marginHorizontal: 24 }}>
      <View
        style={{
          marginLeft: 0,
        }}
      >
        <Header
          icon={"arrow-left-line"}
          onPressIcon={() => navigation.goBack()}
        />
      </View>
      <Text
        style={{
          marginTop: 24,
          fontFamily: "Regular",
          fontWeight: "800",
          fontSize: 20,
          lineHeight: 38,
          display: "flex",
          alignItems: "flex-end",
          letterS: -0.02,

          color: Colors.black,
        }}
      >
        Enter Your OTP
      </Text>
      <View>
        <Text style={{ color: Colors.gray900, fontFamily: "Regular" }}>
          We have sent an OTP to the number {num}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            {/* <ModalPopup
              ref={popup}
              animationType="fade"
              onTouchOutside={() => popup.current.close()}
            >
              <View style={styles.toppopupview}>
                <Image
                  style={styles.popupimage}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/uy8sk7ksnt7-493%3A1585?alt=media&token=ec1911f6-d876-4495-96a3-841182d7a423",
                  }}
                />
                <View style={styles.popuptext}>
                  <Text style={styles.popupmaintext}>Verified</Text>
                  <Text style={styles.popupsecondarytext}>
                    You have successfully Changed your account
                  </Text>
                </View> */}
            {/* <View style={styles.Button}>
                  <Text style={styles.Txt566}>BE OUR PARTNER</Text>
                </View> */}
            {/* <Text style={styles.popupskip}>Skip for now</Text>
              </View>
            </ModalPopup> */}

            <TextInput
              ref={(ref) => (firstTextInputRef.current = ref)}
              maxLength={1}
              keyboardType="numeric"
              style={{
                borderRadius: 10,
                marginTop: 24,
                height: 60,
                width: 60,
                borderColor: focuscolor1,
                textAlign: "center",
                borderWidth: 1,
                fontSize: 20,
              }}
              onFocus={() => onFocus(1)}
              onChangeText={(value) => {
                setFirstTextInputValue(value);
                if (value.length == max) {
                  secondTextInputRef.current?.focus();
                }
              }}
            />
          </View>
          <View>
            <TextInput
              ref={(ref) => (secondTextInputRef.current = ref)}
              keyboardType="numeric"
              maxLength={1}
              style={{
                borderRadius: 10,

                marginTop: 24,
                height: 60,
                width: 60,
                borderColor: focuscolor2,

                textAlign: "center",
                borderWidth: 1,
                fontSize: 20,
              }}
              onFocus={() => onFocus(2)}
              onChangeText={(value) => {
                setSecondTextInputValue(value);
                if (value.length == max) {
                  thirdTextInputRef.current?.focus();
                } else {
                  deFocus(2);
                  firstTextInputRef.current?.focus();
                }
              }}
            />
          </View>
          <View>
            <TextInput
              ref={(ref) => (thirdTextInputRef.current = ref)}
              maxLength={1}
              keyboardType="numeric"
              onFocus={() => onFocus(3)}
              style={{
                borderRadius: 10,

                marginTop: 24,
                height: 60,
                width: 60,
                borderColor: focuscolor3,
                textAlign: "center",
                borderWidth: 1,
                fontSize: 20,
              }}
              onChangeText={(value) => {
                setThirdTextInputValue(value);
                if (value.length == max) {
                  fourthTextInputRef.current?.focus();
                } else {
                  deFocus(3);

                  secondTextInputRef.current?.focus();
                }
              }}
            />
          </View>
          <View>
            <TextInput
              ref={(ref) => (fourthTextInputRef.current = ref)}
              maxLength={1}
              keyboardType="numeric"
              style={{
                borderRadius: 10,

                marginTop: 24,
                height: 60,
                width: 60,
                borderColor: focuscolor4,
                textAlign: "center",
                borderWidth: 1,
                fontSize: 20,
              }}
              onFocus={() => onFocus(4)}
              onChangeText={(value) => {
                setFourthTextInputValue(value);
                if (value.length == max) {
                  // checkotp(value);
                } else {
                  deFocus(4);

                  thirdTextInputRef.current?.focus();
                }
              }}
            />
          </View>
        </View>
      </View>
      <View style={{ position: "relative", marginTop: 100 }}>
        <Text style={{ textAlign: "center", fontFamily: "Regular" }}>
          Didn't got the OTP ? {""}
          <Text
            style={{ color: Colors.primary, textDecorationLine: "underline" }}
          >
            Resend
          </Text>
        </Text>
      </View>
      <Pressable
        onPress={() => {
          checkotp();
        }}
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
            fontWeight: "700",
            fontFamily: "Regular",
            color: Colors.primary,
            textAlignVertical: "center",
          }}
        >
          VERIFY
        </Text>
      </Pressable>
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
    color: "rgba(208,208,208,1)",
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
