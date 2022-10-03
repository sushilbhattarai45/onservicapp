import React, { useState } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "expo-checkbox";
import { Districts } from "../../component/district.js";
const gender = [
  { value: "1", label: "Male" },
  { value: "2", label: "Female" },
  { value: "3", label: "Other" },
];

export default function SignUpScreen() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [vcities, setVCities] = useState([
    // { label: "Bayalpata" },
    // { label: "Bhatakatiya" },
    // { label: "Chaurpati" },
    // { label: "Dhakari" },
    // { label: "Jayagadh" },
    // { label: "Kalagaun" },
    // { label: "Kamal bazar" },
    // { label: "Kuchikot" },
    // { label: "Mellekh" },
    // { label: "Srikot" },
    // { label: "Thanti" },
    // { label: "Turmakhad" },
  ]);
  async function registerUser() {
    const validation = validateSignup(
      name,
      email,
      phone,
      district,
      city,
      street,
      choosedgender,
      pin,
      repin
    );

    alert(validation);
  }
  //for showing error
  const [errorname, setErrorName] = useState(null); //name
  const [erroremail, setErrorEmail] = useState(null); //email
  const [errorphone, setErrorPhone] = useState(null); //phone
  const [errordistrict, setErrorDistrict] = useState(null); //district
  const [errorcity, setErrorCity] = useState(null); //city
  const [errorstreet, setErrorStreet] = useState(null); //street
  const [errorgender, setErrorGender] = useState(null); //gender
  const [errorpin, setErrorPin] = useState(null); //pin
  const [errorrepin, setErrorRepin] = useState(null); //repin

  //end

  //for detrmining the validation and focusing the unvalidated part
  const [focuscolor1, setFocusColor1] = useState(Colors.black); //name
  const [focuscolor2, setFocusColor2] = useState(Colors.black); //email
  const [focuscolor3, setFocusColor3] = useState(Colors.black); //phone
  const [focuscolor4, setFocusColor4] = useState(Colors.black); //district
  const [focuscolor5, setFocusColor5] = useState(Colors.black); //city
  const [focuscolor6, setFocusColor6] = useState(Colors.black); //street
  const [focuscolor7, setFocusColor7] = useState(Colors.black); //gender
  const [focuscolor8, setFocusColor8] = useState(Colors.black); //pin
  const [focuscolor9, setFocusColor9] = useState(Colors.black); //repin
  //end
  //dropdown

  const [choosedcity, setChoosedCity] = useState(null);
  const [gvalue, setGValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dvalue, setDValue] = useState(null);
  //end

  //normal data states
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pin, setPin] = useState("");
  const [repin, setRePin] = useState("");
  const [accepted, setAccepted] = useState("");
  const [choosedgender, setChoosedGender] = useState("");
  //end

  const validateSignup = (
    vname,
    vemail,
    vphone,
    vdistrict,
    vcity,
    vstreet,
    vchoosedgender,
    vpin,
    vrepin
  ) => {
    alert(vname.length + "ok");
    // if (
    //   vname.length != 0 &&
    //   vemail.length != 0 &&
    //   vphone.length != 0 &&
    //   vdistrict.length != 0 &&
    //   vstreet.length != 0 &&
    //   vchoosedgender.length != 0 &&
    //   vpin.length != 0 &&
    //   vrepin.length != 0
    // ) {
    // } else {
    if (vname.length == 0) {
      setFocusColor1("red");
      setErrorName("Please Enter Your FullName");
    }
    if (vemail.length == 0) {
      // setErrorEmail("Please Enter Your Email address");

      setFocusColor2("red");
    }
    if (vphone.length == 0 || vphone == null) {
      // setErrorPhone("Please Enter Your Phone Number");

      setFocusColor3("red");
    }
    if (vdistrict.length == 0) {
      // setErrorDistrict("Please Choose your district");
      setFocusColor4("red");
    }
    if (vcity.length == 0) {
      // setErrorCity("Please Choose your city");

      setFocusColor5("red");
    }
    if (vstreet.length == 0) {
      // setErrorStreet("Please Enter Your Streetname");

      setFocusColor6("red");
    }
    if (vchoosedgender.length == 0) {
      // setErrorGender("Please choose your gender");

      setFocusColor7("red");
    }
    if (vpin.length == 0) {
      // setErrorPin("Please Enter Your PIN");

      setFocusColor8("red");
    }
    if (vrepin.length == 0) {
      setFocusColor9("red");
    }
    // }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, margin: 30, flexDirection: "column" }}>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text
            style={{
              textAlignVertical: "center",
              flex: 5,

              fontFamily: "Urbanist",
              fontStyle: "normal",
              fontWeight: "800",
              fontSize: 32,
              lineHeight: 38,
              display: "flex",
              alignItems: "flex-end",
              letterspacing: -0.02,
            }}
          >
            Register
          </Text>

          <View
            style={{
              right: 0,
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Image
              style={{
                marginTop: 10,
                width: 50,
                height: 50,
              }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/qqlret7skn-I155%3A2151%3B22%3A106?alt=media&token=505e72a8-f261-4f38-81e1-bfae6f037c3e",
              }}
            />
            <Text style={{ marginTop: 10, color: Colors.primary }}>Choose</Text>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text>Full Name *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor1,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setName(value);
                setFocusColor1(Colors.primary);

                console.log(name);
              }}
              placeholder="Full Name"
            />
            <Text style={{ color: "red" }}>{errorname}</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Email Address *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor2,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setEmail(value);
                setFocusColor2(Colors.primary);

                console.log(email);
              }}
              placeholder="Full Name"
            />
            {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Phone Number *</Text>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor3,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setPhone(value);
                setFocusColor3(Colors.primary);

                console.log(phone);
              }}
              placeholder="Phone Number"
            />
            {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>District *</Text>
            <Dropdown
              style={{
                width: "100%",
                marginTop: 8,
                marginRight: -10,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor4,
                borderRadius: 4,
                height: 50,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Districts}
              maxHeight={300}
              labelField="label"
              search
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={dvalue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                console.log(vcities);
                setDValue(item.value);
                setFocusColor4(Colors.primary);

                setIsFocus(false);
                setVCities(item.cities);
                setDistrict(item.label);
                console.log(vcities);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
        </View>

        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Cities *</Text>
            <Dropdown
              style={{
                width: "100%",
                marginTop: 8,
                marginRight: -10,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor5,
                borderRadius: 4,
                height: 50,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={vcities}
              maxHeight={300}
              labelField="label"
              search
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={choosedcity}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setFocusColor5(Colors.primary);

                setChoosedCity(item.value);
                setIsFocus(false);
                setCity(item.label);
                console.log(vcities);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
        </View>

        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Street *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor6,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setFocusColor6(Colors.primary);

                setStreet(value);
                console.log(street);
              }}
              placeholder="Street"
            />
            {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Gender *</Text>
            <Dropdown
              style={{
                width: "100%",
                marginTop: 8,
                marginRight: -10,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor7,
                borderRadius: 4,
                height: 50,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={gender}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={gvalue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                console.log(item);
                setFocusColor7(Colors.primary);

                setChoosedGender(item.value);
                setGValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Create PIN *</Text>
            <TextInput
              maxLength={4}
              keyboardType={"numeric"}
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor8,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setPin(value);
                setFocusColor8(Colors.primary);

                console.log(pin);
              }}
              placeholder="Enter A New PIN"
            />
            {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Confirm PIN *</Text>
            <TextInput
              maxLength={4}
              keyboardType={"numeric"}
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: focuscolor9,
                borderRadius: 4,
                height: 50,
              }}
              onChangeText={(value) => {
                setRePin(value);
                setFocusColor9(Colors.primary);
                console.log(repin);
              }}
              placeholder="Re-Enter Your PIN"
            />
            {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
          </View>
          <View
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CheckBox
              value={toggleCheckBox}
              onValueChange={() => {
                setToggleCheckBox(!toggleCheckBox);
                setAccepted(!toggleCheckBox);
              }}
              color={toggleCheckBox ? Colors.primary : undefined}
            />
            <Text style={{ marginLeft: 12, fontSize: 12 }}>
              I agree to the{" "}
              <Text
                style={{
                  color: Colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Terms and Condition
              </Text>{" "}
              and{" "}
              <Text
                style={{
                  color: Colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Privacy Policy
              </Text>{" "}
            </Text>
          </View>
          <Pressable
            style={{
              borderColor: Colors.primary,
              borderWidth: 1,
              justifyContent: "center",
              height: 50,
              marginTop: 24,
            }}
            onPress={async () => {
              await registerUser();
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
              CREATE
            </Text>
          </Pressable>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              marginTop: 12,
              color: Colors.black,
              fontFamily: "Urbanist",
              textAlignVertical: "center",
            }}
          >
            Already Have an Account?{" "}
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                marginTop: 12,
                fontWeight: "bold",
                color: Colors.primary,
                fontFamily: "Urbanist",
                textDecorationLine: "underline",

                textAlignVertical: "center",
              }}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },

  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
