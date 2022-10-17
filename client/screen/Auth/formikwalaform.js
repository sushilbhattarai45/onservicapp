// App.js

import React, { createRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  TextInput,
  Text,
  Alert,
  View,
  StyleSheet,
  Image,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";

import { Districts } from "../../component/district";
import * as ImagePicker from "expo-image-picker";
const BASE_OUR_API_URL = "http://192.168.100.11:3001";
import axios from "axios";
import * as yup from "yup";
import { Field, Formik } from "formik";

// import ModalPopup from "../../component/Modal";
export const Colors = {
  primary: "#FDA92A",
  gray500: "#D0D0D0",
  white: "#FFFFFF",
  gray200: "#F9F9FC",
  black: "#212121",
  gray900: "#616161",
  gold: "#F7B840",
};

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

export default Formikwalaform = () => {
  // const [district, setDistrict] = useState();

  let popupRef = createRef();
  const [citiesList, setCitiesList] = useState([]);
  const [file, setFile] = useState(null);
  const uploadImage = async (file) => {
    console.log("the file you have choosed is ");
    console.log(file);
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
      console.log("s" + serverUrl);
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
    <ScrollView style={styles.container}>
      {/* <ModalPopoup
        ref={(target) => (popupRef = target)}
        onTouchOutside={() => popupRef.close()}
      /> */}
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
        onSubmit={(values) => {
          console.log(JSON.stringify(values));

          uploadImage(file).then((res) => {
            console.log("hello" + { res });

            // handleChange(BASE_OUR_API_URL + "/" + res);
          });
        }}
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
                marginTop: 20,
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
                      right: 3,
                      height: 75,
                      width: 75,
                      borderRadius: 24,
                      borderWidth: StyleSheet.hairlineWidth,
                      objectFit: "contain",
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
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
                {!values.gender ? (
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
                {!values.district ? (
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
                {!values.city ? (
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
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 40,
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
