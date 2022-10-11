import { useRef, React, useState } from "react";

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
export default function OtpScreen() {
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const max = 1;
  const firstTextInputRef = useRef(null);
  const [secondTextInputValue, setSecondTextInputValue] = useState(null);
  const [firstTextInputValue, setFirstTextInputValue] = useState(null);
  const [thirdTextInputValue, setThirdTextInputValue] = useState(null);
  const [fourthTextInputValue, setFourthTextInputValue] = useState(null);
  const [focuscolor1, setFocusColor1] = useState(Colors.black);
  const [focuscolor2, setFocusColor2] = useState(Colors.black);
  const [focuscolor3, setFocusColor3] = useState(Colors.black);
  const [focuscolor4, setFocusColor4] = useState(Colors.black);

  const onFocus = (id) => {
    if (id == 1) setFocusColor1(Colors.primary);
    if (id == 2) setFocusColor2(Colors.primary);
    setFocusColor1(Colors.primary);
    if (id == 3) setFocusColor3(Colors.primary);
    setFocusColor1(Colors.primary);
    if (id == 4) setFocusColor4(Colors.primary);
  };

  const deFocus = (id) => {
    if (id == 1) setFocusColor1(Colors.black);
    if (id == 2) setFocusColor2(Colors.black);
    setFocusColor1(Colors.primary);
    if (id == 3) setFocusColor3(Colors.black);
    setFocusColor1(Colors.primary);
    if (id == 4) setFocusColor4(Colors.black);
  };
  const checkotp = (fourth) => {
    const givenotp =
      firstTextInputValue +
      secondTextInputValue +
      thirdTextInputValue +
      fourthTextInputValue;
    alert(givenotp);
  };
  return (
    <View style={{ margin: 30 }}>
      <Text
        style={{
          marginTop: 50,
          fontFamily: "Black",
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
        Enter Your OTP
      </Text>
      <View>
        <Text style={{ color: Colors.gray500 }}>
          We have sent an OTP to the number +977-9800000000
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
        <Text style={{ textAlign: "center" }}>
          Didn't got the OTP?
          <Text style={{ color: Colors.primary }}> Resend</Text>
        </Text>
      </View>
      <Pressable
        onPress={() => checkotp()}
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
            color: Colors.primary,
            fontFamily: "Bold",
            textAlignVertical: "center",
          }}
        >
          VERIFY
        </Text>
      </Pressable>
    </View>
  );
}
