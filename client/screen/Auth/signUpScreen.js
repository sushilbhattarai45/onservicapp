// App.js

import React, { createRef, useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  TextInput,
  Text,
  Alert,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import { Districts } from "../../component/district";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Header from "../../component/Header";
import { Colors } from "../../styles/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import ModalPopup from "../../component/Modal";
import AppContext from "../../component/appContext";
import { BASE_OUR_API_URL, uploadImage } from "../../component/tools";

const gendersList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const userValidationSchema = yup.object().shape({
  name: yup.string().min(6).required("Please, provide your name!"),
  email: yup
    .string()
    .email("Please, provide a valid email!")
    .required("Please, provide your email!"),
  phone: yup
    .number("Phone number must be Numeric")
    .min(10)
    .required("Please, provide your Phone Number!"),
  accepted: yup.bool().oneOf([true], "Field must be checked"),
  password: yup
    .string()
    .min(4, "Pin must be of 4 digits")
    .max(4)
    .required("Please, create a new PIN!"),
  gender: yup.string().required("Please, select your gender"),
  district: yup.string().required("Please, provide your district!"),
  city: yup.string().required("Please, provide your city!"),
  street: yup.string().min(6).required("Please, provide your street!"),
  confirm: yup
    .string()
    .label("confirm password")
    .required("Please, Reenter your PIN!")
    .oneOf([yup.ref("password"), null], "PIN must match"),
  image: yup.string().required("Please Choose an Image"),
});

export default registerUser = ({ navigation }) => {
  const { userData, logged, user, setUserData, setLogged, setUser, setIsitSp } =
    useContext(AppContext);
  // const [district, setDistrict] = useState();
  const [data, setData] = useState();
  let popupRef = createRef();
  const [citiesList, setCitiesList] = useState([]);
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);

  async function postData(values, { setSubmitting, setFieldError }) {
    setLoad(true);
    const [img] = await uploadImage([values.image]);
    console.log("a " + img);
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
    const status = response?.data?.statuscode;
    if (status == 201) {
      setLoad(false);
      const finaldata = response?.data?.user;
      setData(finaldata);
      setUserData(finaldata);
      setLogged("true");
      setIsitSp(null);
      setUser(values.phone);
      await storeData(values.phone);

      navigation.navigate("Home");
    } else if (status == 600) {
      setLoad(false);
      setFieldError("phone", "Phone Number already exists");
    } else {
      setLoad(false);
      alert("no");
    }
    alert(status);
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("user_contact", value);
    } catch (e) {}
  };
  const selectFile = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      });
      if (!result.cancelled) {
        setFile(result);
        let uri = result.uri;
        return uri;
      } else {
        return values.image;
      }
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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 0.1}>
        <ScrollView style={styles.container}>
          {/* <ModalPopoup
        ref={(target) => (popupRef = target)}
        onTouchOutside={() => popupRef.close()}
      /> */}
          <View
            style={{
              marginTop: 0,

              marginBottom: 20,
            }}
          >
            <Header
              icon={"arrow-left-line"}
              onPressIcon={() => navigation.navigate("Home")}
            />
          </View>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirm: "",
              phone: "",
              district: "",
              gender: "",
              city: "",
              street: "",
              accepted: false,
              image: null,
            }}
            onSubmit={postData}
            validationSchema={() => userValidationSchema}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldValue,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 5,
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
                      right: 20,
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Pressable
                      onPress={async () => {
                        let img = await selectFile();
                        console.log("a" + img);
                        setFieldValue("image", img);
                      }}
                    >
                      {!values.image ? (
                        <Image
                          style={{
                            alignSelf: "center",
                            right: 0,
                            height: 75,
                            width: 75,
                            borderRadius: 24,
                            borderWidth: StyleSheet.hairlineWidth,
                            objectFit: "contain",
                          }}
                          source={require("../../assets/images/profile.png")}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: values.image
                              ? values.image
                              : "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/qqlret7skn-I155%3A2151%3B22%3A106?alt=media&token=505e72a8-f261-4f38-81e1-bfae6f037c3e",
                          }}
                          style={{
                            alignSelf: "center",
                            right: 0,
                            height: 75,
                            width: 75,
                            borderRadius: 24,
                            borderWidth: StyleSheet.hairlineWidth,
                            objectFit: "contain",
                          }}
                        />
                      )}
                      <Text
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          color: errors.image ? "red" : Colors.primary,
                        }}
                      >
                        Choose
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.formContainer}>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Full Name*</Text>
                    <TextInput
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.name
                            ? Colors.gray900
                            : errors.name
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={() => setFieldTouched("name")}
                      placeholder="Name"
                    />
                    {touched.name && errors.name && (
                      <Text style={{ color: "red" }}>{errors.name}</Text>
                    )}
                    {/* <Text style={{ color: "red" }}>This field Is required</Text> */}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Email Address *</Text>
                    <TextInput
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.email
                            ? Colors.gray900
                            : errors.email
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                      placeholder="Email"
                    />
                    {touched.email && errors.email && (
                      <Text style={{ color: "red" }}>{errors.email}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Phone Number *</Text>
                    <TextInput
                      keyboardType="numeric"
                      maxLength={10}
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.phone
                            ? Colors.gray900
                            : errors.phone
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={() => setFieldTouched("phone")}
                      placeholder="Phone Number"
                    />
                    {touched.phone && errors.phone && (
                      <Text style={{ color: "red" }}>{errors.phone}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Gender *</Text>
                    <Dropdown
                      style={[
                        {
                          width: "100%",
                          marginTop: 8,
                          marginRight: -10,
                          borderWidth: 1,
                          padding: 16,
                          borderRadius: 4,
                          height: 50,
                        },
                        !touched.gender
                          ? { borderColor: Colors.gray900 }
                          : !values.gender
                          ? { borderColor: "red" }
                          : { borderColor: Colors.primary },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={gendersList}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select item"}
                      value={values.gender}
                      onChange={(item) => {
                        setFieldValue("gender", item.value);
                        setFieldValue("gender", item.value);

                        setFieldTouched("gender");
                      }}
                      // onBlur={() => setFieldTouched("gender")}
                    />
                    {!values.gender && touched.gender ? (
                      <Text style={{ color: "red" }}>{errors.gender}</Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>District *</Text>
                    <Dropdown
                      style={[
                        {
                          width: "100%",
                          marginTop: 8,
                          marginRight: -10,
                          borderWidth: 1,
                          padding: 16,
                          borderRadius: 4,
                          height: 50,
                        },
                        !touched.district
                          ? { borderColor: Colors.gray900 }
                          : values.district
                          ? { borderColor: Colors.primary }
                          : { borderColor: "red" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={Districts}
                      labelField="label"
                      onBlur={() => setFieldTouched("district")}
                      valueField="label"
                      placeholder={"Select item"}
                      searchPlaceholder="Search..."
                      search
                      value={values.district}
                      onChange={(item) => {
                        setFieldValue("district", item.label);
                        setCitiesList(item.cities);
                      }}
                    />
                    {!values.district && touched.district ? (
                      <Text style={{ color: "red" }}>{errors.district}</Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>City *</Text>
                    <Dropdown
                      style={[
                        {
                          width: "100%",
                          marginTop: 8,
                          marginRight: -10,
                          borderWidth: 1,
                          padding: 16,
                          borderRadius: 4,
                          height: 50,
                        },
                        !touched.city
                          ? { borderColor: Colors.gray900 }
                          : values.city
                          ? { borderColor: Colors.primary }
                          : { borderColor: "red" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={citiesList ? citiesList : []}
                      labelField="label"
                      onBlur={() => setFieldTouched("city")}
                      valueField="label"
                      placeholder={"Select item"}
                      value={values.city}
                      onChange={(item) => {
                        setFieldValue("city", item.label);
                        console.log(item.label);
                      }}
                    />
                    {!values.city && touched.city ? (
                      <Text style={{ color: "red" }}>{errors.city}</Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Street *</Text>
                    <TextInput
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.street
                            ? Colors.gray900
                            : errors.street
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.street}
                      onChangeText={handleChange("street")}
                      onBlur={() => setFieldTouched("street")}
                      placeholder="Street"
                    />
                    {touched.street && errors.street && (
                      <Text style={{ color: "red" }}>{errors.street}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Password *</Text>
                    <TextInput
                      keyboardType="numeric"
                      maxLength={4}
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.password
                            ? Colors.gray900
                            : errors.password
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={() => setFieldTouched("password")}
                      placeholder="Password"
                    />
                    {touched.password && errors.password && (
                      <Text style={{ color: "red" }}>{errors.password}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Confirm Password *</Text>
                    <TextInput
                      keyboardType="numeric"
                      maxLength={4}
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.confirm
                            ? Colors.gray900
                            : errors.confirm
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.confirm}
                      onChangeText={handleChange("confirm")}
                      onBlur={() => setFieldTouched("confirm")}
                      placeholder="Confirm Password"
                    />
                    {touched.confirm && errors.confirm && (
                      <Text style={{ color: "red" }}>{errors.confirm}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: 24,
                      marginRight: 10,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CheckBox
                      value={values.accepted}
                      onValueChange={() => {
                        setFieldValue("accepted", !values.accepted);
                      }}
                      color={
                        !touched.accepted
                          ? undefined
                          : values.accepted
                          ? Colors.primary
                          : errors.accepted && !touched.accepted
                          ? "red"
                          : undefined
                      }
                    />
                    {
                      <Text
                        style={{
                          marginLeft: 12,
                          color: errors.accepted ? Colors.black : Colors.red,
                          fontSize: 12,
                        }}
                      >
                        I agree to the{" "}
                        <Text
                          style={{
                            color: errors.accepted ? "red" : Colors.primary,
                            textDecorationLine: "underline",
                          }}
                        >
                          Terms and Condition
                        </Text>{" "}
                        and{" "}
                        <Text
                          style={{
                            color: errors.accepted ? "red" : Colors.primary,
                            textDecorationLine: "underline",
                          }}
                        >
                          Privacy Policy
                        </Text>{" "}
                      </Text>
                    }
                  </View>

                  <Pressable
                    style={{
                      borderColor: Colors.primary,
                      borderWidth: 1,
                      justifyContent: "center",
                      height: 50,
                      marginTop: 24,
                    }}
                    disabled={load}
                    onPress={handleSubmit}
                  >
                    {load ? (
                      <ActivityIndicator
                        size="large"
                        style={{
                          marginTop: 8,
                        }}
                        color={Colors.primary}
                      />
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          fontFamily: "Bold",
                          color: Colors.primary,
                          textAlignVertical: "center",
                        }}
                      >
                        CREATE
                      </Text>
                    )}
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
                      onPress={() => navigation.navigate("Login")}
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
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 10,
    position: "relative",
    marginBottom: 20,
  },
  inputStyle: {
    width: "100%",
    marginTop: 8,
    borderWidth: 1,
    padding: 16,
    borderColor: Colors.primary,
    borderRadius: 4,
    height: 50,
    outline: "none",
  },
});
console.disableYellowBox = true;
