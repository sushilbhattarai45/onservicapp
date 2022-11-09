// App.js

import React, { createRef, useContext, useEffect, useState } from "react";
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
} from "react-native";
import CheckBox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import AppContext from "../../component/appContext";
import { Districts } from "../../component/district";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as yup from "yup";
import { Field, Formik } from "formik";
import Header from "../../component/Header";
import { Colors } from "../../styles/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "../../App";
// import ModalPopup from "../../component/Modal";
import { axiosInstance, BASE_OUR_API_URL } from "../../component/tools";

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
  image: yup.string().required(),
});

export default UpdateUser = ({ navigation }) => {
  const { userData, setUserData } = useContext(AppContext);
  // const [district, setDistrict] = useState();
  const [data, setData] = useState();
  let popupRef = createRef();
  const [citiesList, setCitiesList] = useState([]);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const uploadImage = async (file) => {
    // console.log("the file you have choosed is ");
    // console.log(file);
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

      const response = await axiosInstance("user/uploadImage", {
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

      console.log("trying again " + serverUrl);

      axios(serverUrl, {
        method: "post",
        data: data,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log("second error");
          console.log(error);
        });
      // setError({
      //   target: "image",
      //   message: "Sry, we are having trouble uploading the Profile ",
      // });
      return;
    }
  };
  useEffect(() => {
    Districts.map((item) => {
      if (userData?.user_district == item.label) {
        setCitiesList(item.cities);
      }
    });
  });
  async function postData(values, { setSubmitting, setFieldError }) {
    uploadImage(file).then(async (res) => {
      let img;
      alert(res);
      if (res != null) {
        img = BASE_OUR_API_URL + "/" + res;
      } else {
        img = values.image;
      }
      let response = await axios.post(
        BASE_OUR_API_URL + "/v1/api/user/updateUser",
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
        const finaldata = response?.data?.user;
        setData(finaldata);
        setUserData(finaldata[0]);
        console.log(finaldata);
        await storeData(data);
        navigation.navigate("Home");
      } else if (status == 600) {
        setFieldError("phone", "Phone Number already exists");
      } else {
        alert("no");
      }
    });
  }
  const storeData = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem("user_contact", value?.user_contact);
    } catch (e) {}
  };
  const selectFile = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync();

      setFile(result);

      let uri = result.uri;
      return uri;
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
              name: userData?.user_name,
              email: userData?.user_email,
              password: userData?.user_password,
              confirm: "",
              phone: userData?.user_contact,
              district: userData?.user_district,
              gender: userData?.user_gender,
              city: userData?.user_city,
              street: userData?.user_street,
              accepted: false,
              image: userData?.user_profileImage,
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
                    marginTop: 2,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 5,
                      fontStyle: "normal",
                      fontWeight: "800",
                      fontSize: 20,
                      lineHeight: 38,
                      display: "flex",
                      alignItems: "flex-end",
                      letterspacing: -0.02,
                    }}
                  >
                    Update Your Profile
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
                      editable={false}
                      color="black"
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
                        console.log(item.cities);
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
                      secureTextEntry={true}
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
                      secureTextEntry={true}
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
                    onPress={handleSubmit}
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
    marginBottom: 10,
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
