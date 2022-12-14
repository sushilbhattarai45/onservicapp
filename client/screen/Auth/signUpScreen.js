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
import { Districts } from "../../component/district";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Header from "../../component/Header";
import { Colors } from "../../styles/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import ModalPopup from "../../component/Modal";
import { API_KEY } from "@env";
import { Linking } from "react-native";
import AppContext from "../../component/appContext";
import { BASE_OUR_API_URL, getSms, uploadImage } from "../../component/tools";

const gendersList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const userValidationSchema = yup.object().shape({
  name: yup.string().min(6).required("Please, provide your name!"),
  email: yup.string().email("Please, provide a valid email!"),
  // .required("Please, provide your email!"),
  phone: yup
    .number()
    .typeError("Phone number must be a number")
    .min(1000000000, "Please, provide a valid phone number!")
    .required("Please, provide your phone number!"),
  accepted: yup.bool().oneOf([true], "Field must be checked"),
  password: yup
    .string()
    .min(8, "Password must be greater or equal to 8  digits")

    .required("Please, create a new Password!"),
  gender: yup.string().required("Please, select your gender"),
  district: yup.string().required("Please, provide your district!"),
  city: yup.string().required("Please, provide your city!"),
  street: yup.string().min(6),
  confirm: yup
    .string()
    .label("confirm password")
    .required("Please, Reenter your Password!")
    .oneOf([yup.ref("password"), null], "Password must match"),
  // image: yup.string().required("Please Choose an Image"),
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
    setSubmitting(true);
    console.log(values);
    // const [img] = await uploadImage([values.image]);

    let response = await axios.post(
      BASE_OUR_API_URL + "/v1/api/user/getOneUser",
      {
        user_contact: values.phone,
        GIVEN_API_KEY: API_KEY,
      }
    );
    const status = response?.data?.statuscode;
    if (status == 400) {
      setLoad(false);
      console.log("ok");
      let genOtp = Math.floor(1000 + Math.random() * 9000);
      console.log(genOtp);
      getSms(genOtp, values.phone);
      navigation.navigate("OtpScreen", {
        num: values.phone,
        otp: genOtp,
        type: "signup",
        values: values,
      });
    } else if (status == 201) {
      setLoad(false);
      setSubmitting(false);
      setFieldError("phone", "Phone Number already exists");
    } else {
      setSubmitting(false);
      setLoad(false);
    }
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("user_contact", value);
    } catch (e) {}
  };
  // const selectFile = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: "Images",
  //     });
  //     if (!result.cancelled) {
  //       setFile(result);
  //       let uri = result.uri;
  //       return uri;
  //     } else {
  //       return values.image;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
                    Create
                  </Text>

                  <View
                    style={{
                      right: 20,
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/* <Pressable
                      style={{ borderRadius: 10 }}
                      onPress={async () => {
                        let img = await selectFile();
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
                            borderColor: "red",
                          }}
                          objectFit="cover"
                          source={require("../../assets/images/a.jpg")}
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
                            borderRadius: 24,
                            height: 75,
                            width: 75,
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
                        {values.image ? "Choose" : "Please Select"}
                      </Text>
                    </Pressable> */}
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
                    <Text>Email Address</Text>
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
                    <TextInput
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: !touched.city
                            ? Colors.gray900
                            : errors.city
                            ? "red"
                            : Colors.primary,
                        },
                      ]}
                      value={values.city}
                      onChangeText={handleChange("city")}
                      onBlur={() => setFieldTouched("city")}
                      placeholder="City"
                      placeholderTextColor={Colors.gray900}
                    />
                    {/* <Dropdown
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
                      }}
                    /> */}
                    {!values.city && touched.city ? (
                      <Text style={{ color: "red" }}>{errors.city}</Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text>Street</Text>
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
                        onPress={() =>
                          Linking.openURL("https://onservic.com/privacy.txt")
                        }
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
                  {errors.image ? (
                    <Text
                      style={{
                        marginTop: 5,
                        color: "red",
                      }}
                    >
                      Please choose an Image
                    </Text>
                  ) : null}
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
