import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import validator from "email-validator";
import { Colors } from "../../styles/main";
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "expo-checkbox";
import { Districts } from "../../component/district.js";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { API_KEY } from "@env";

import Header from "../../component/Header";
import axios from "axios";
const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];
import { BASE_OUR_API_URL } from "../../component/tools";

export default function ImagePickerExample() {
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
      repin,
      setAccepted,
      image
    );
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
  const [errorcheckbox, setErrorCheckBox] = useState(null); //repin

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
  const [focuscolor10, setFocusColor10] = useState(Colors.black); //repin

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
  const [accepted, setAccepted] = useState(false);
  const [choosedgender, setChoosedGender] = useState("");
  const [image, setImage] = useState("");

  const [file, setFile] = useState(null);

  //end
  const uploadImage = async (file) => {
    try {
      // checks if the file is empty
      if (file === null) {
        setError({
          target: "image",
          message: "Sorry ,There is some error with the profile picture!!",
        });
        return null;
      }
      // setError(false);
      // if not empty creating a form data to send to upload the image to the server
      // alert("ok");

      const imageToUpload = file;
      const data = new FormData();

      data.append(
        "profile",
        {
          uri: imageToUpload?.uri,
          name: imageToUpload?.uri,
          type: "image/jpg",
        },
        "myfile"
      );

      const serverUrl = BASE_OUR_API_URL + `/v1/api/user/uploadImage`;
      const response = await axios(serverUrl, {
        method: "post",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      var url = response?.data?.fileName;
      const filename = url.split("\\");
      const finalname = filename[0] + "/" + filename[1];
      return finalname;
    } catch (e) {
      const serverUrl = BASE_OUR_API_URL + `/v1/api/user/uploadImage`;

      axios(serverUrl, {
        method: "post",
        data: data,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(res)
        .catch((error) => {
          console.log(error);
        });
      // setError({
      //   target: "image",
      //   message: "Sry, we are having trouble uploading the Profile ",
      // });
      return;
    }
  };
  const selectFile = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync();

      setFile(result);

      uploadImage(result).then((res) => {
        setImage(BASE_OUR_API_URL + "/" + res);
      });
    } catch (e) {
      console.log(e);
    }

    // console.log({ result });
    // let result = await launchImageLibraryAsync({ mediaTypes: "photo" });
    // console.log(result);
    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  const validateSignup = async (
    vname,
    vemail,
    vphone,
    vdistrict,
    vcity,
    vstreet,
    vchoosedgender,
    vpin,
    vrepin,
    vaccepted,
    vprof
  ) => {
    // alert(vname.length + "ok");
    if (
      vname.length >= 4 &&
      vemail.length > 4 &&
      vphone.length != 0 &&
      vdistrict.length != 0 &&
      vstreet.length != 0 &&
      vchoosedgender.length != 0 &&
      vpin.length != 0 &&
      vrepin.length != 0 &&
      vprof.length != 0
    ) {
      var length = vphone.length;

      if (vpin.length && vrepin.length == 4) {
        if (validator.validate(vemail)) {
          if (vpin != vrepin) {
            setErrorPin("PIN not matched");
            setFocusColor8("red");
            setErrorRepin("PIN not matched");
            setFocusColor9("red");
          }
        } else {
          setErrorEmail("Please Enter a valid email");
          setFocusColor2("red");
        }
      } else {
        setErrorPin("PIN must be of 4 digit");
        setFocusColor8("red");
        setErrorRepin("PIN must be of 4 digit");
        setFocusColor9("red");
      }

      if (length == 10) {
        if (vpin == vrepin && vpin.length == 4 && vrepin.length == 4) {
          if (accepted) {
            const res = await axios.post(
              BASE_OUR_API_URL + "/v1/api/user/register",
              {
                API_KEY: API_KEY,
                user_name: vname,
                user_email: vemail,
                user_contact: vphone,
                user_district: vdistrict,
                user_city: vcity,
                user_street: vstreet,
                user_gender: vchoosedgender,
                user_password: vpin,
                user_profileImage: vprof,
                user_toc: {
                  date: moment().format("ll"),
                  time: moment().format("LT"),
                },
              }
            );
            const status = res?.data?.statuscode;
            if (status == 600) {
              setFocusColor3("red");
              setErrorPhone("User with this number already Exists");
            }
            if (status == 201) {
              alert("You are good to go");
            }

            console.log({ response: e });
          } else {
            setFocusColor10("red");
            setErrorCheckBox("To proceed please accept the privacy policy.");
          }
        }
      } else {
        setErrorPhone("Enter a valid Phone Number");
        setFocusColor3("red");
      }
    } else {
      if (vname.length < 4) {
        setFocusColor1("red");
        setErrorName("Please Enter Your FullName");
      }
      if (vemail.length < 4) {
        setErrorEmail("Please Enter Your Email address");

        setFocusColor2("red");
      }
      if (vphone.length == 0 || vphone == null) {
        setErrorPhone("Please Enter Your Phone Number");

        setFocusColor3("red");
      }
      if (vdistrict.length == 0) {
        setErrorDistrict("Please Choose your district");
        setFocusColor4("red");
      }
      if (vcity.length == 0) {
        setErrorCity("Please Choose your city");

        setFocusColor5("red");
      }
      if (vstreet.length < 3) {
        setErrorStreet("Please Enter your full  Streetname");

        setFocusColor6("red");
      }
      if (vchoosedgender.length == 0) {
        setErrorGender("Please choose your gender");

        setFocusColor7("red");
      }
      if (vpin.length == 0) {
        setErrorPin("Please Enter Your PIN");

        setFocusColor8("red");
      }
      if (vrepin.length == 0) {
        setFocusColor9("red");
        setErrorRepin("Please ReEnter Your PIN");
      }
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, margin: 30, flexDirection: "column" }}>
        <Header />
        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
            flex: 1,
            marginBottom: 50,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              textAlignVertical: "center",
            }}
          >
            <Text
              style={{
                textAlignVertical: "center",
                flex: 5,

                fontFamily: "Bold",
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
                // backgroundColor: "red",
                position: "absolute",
                justifyContent: "center",

                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <Pressable onPress={() => selectFile()}>
                <Image
                  source={
                    image !== ""
                      ? {
                          uri: image,
                        }
                      : {
                          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/qqlret7skn-I155%3A2151%3B22%3A106?alt=media&token=505e72a8-f261-4f38-81e1-bfae6f037c3e",
                        }
                  }
                  style={{
                    right: 0,
                    alignSelf: "center",
                    height: 75,
                    width: 75,
                    marginTop: 30,
                    borderRadius: 50,
                  }}
                />
              </Pressable>
              <Text
                onPress={() => selectFile()}
                style={{
                  marginTop: 10,
                  alignSelf: "center",
                  textAlign: "center",
                  color: Colors.primary,
                }}
              >
                Choose Photo
              </Text>
            </View>
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
                setErrorName("");
                console.log(name);
              }}
              placeholder="Full Name"
            />
            {errorname ? (
              <Text style={{ color: "red" }}>{errorname}</Text>
            ) : null}
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
                setErrorEmail("");
                console.log(email);
              }}
              placeholder="Full Name"
            />
            {erroremail ? (
              <Text style={{ color: "red" }}>{erroremail}</Text>
            ) : null}
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
                setErrorPhone("");
                console.log(phone);
              }}
              placeholder="Phone Number"
            />
            {errorphone ? (
              <Text style={{ color: "red" }}>{errorphone}</Text>
            ) : null}
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
                setErrorDistrict("");
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
            {errordistrict ? (
              <Text style={{ color: "red" }}>{errordistrict}</Text>
            ) : null}
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
                setErrorCity("");
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
            {errorcity ? (
              <Text style={{ color: "red" }}>{errorcity}</Text>
            ) : null}
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
                setErrorStreet("");
                setStreet(value);
                console.log(street);
              }}
              placeholder="Street"
            />
            {errorstreet ? (
              <Text style={{ color: "red" }}>{errorstreet}</Text>
            ) : null}
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
                setErrorGender("");
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
            {errorgender ? (
              <Text style={{ color: "red" }}>{errorgender}</Text>
            ) : null}
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
                setErrorPin("");
                setErrorRepin("");
                console.log(pin);
              }}
              placeholder="Enter A New PIN"
            />
            {errorpin ? <Text style={{ color: "red" }}>{errorpin}</Text> : null}
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
                setFocusColor8(Colors.primary);
                setRePin(value);
                setErrorPin("");
                setErrorRepin("");
                setFocusColor9(Colors.primary);
                console.log(repin);
              }}
              placeholder="Re-Enter Your PIN"
            />
            {errorrepin ? (
              <Text style={{ color: "red" }}>{errorrepin}</Text>
            ) : null}

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
            {errorcheckbox ? (
              <Text
                style={{
                  marginLeft: 12,
                  color: focuscolor10,
                  fontSize: 12,
                }}
              >
                I agree to the{" "}
                <Text
                  style={{
                    color: focuscolor10,
                    textDecorationLine: "underline",
                  }}
                >
                  Terms and Condition
                </Text>{" "}
                and{" "}
                <Text
                  style={{
                    color: Colors.focuscolor10,

                    textDecorationLine: "underline",
                  }}
                >
                  Privacy Policy
                </Text>{" "}
              </Text>
            ) : (
              <Text style={{ marginLeft: 12, fontSize: 12 }}>
                I agree to the{" "}
                <Text
                  style={{
                    color: Colors.black,
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
            )}
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
                fontFamily: "Bold",
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
              fontFamily: "Regular",
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
                fontFamily: "SemiBold",
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
