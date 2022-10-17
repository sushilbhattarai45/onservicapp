// App.js

import React, { useCallback, useState } from "react";
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
import * as ImagePicker from "react-native-image-picker";

import * as yup from "yup";
import { Formik } from "formik";
export const Colors = {
  primary: "#FDA92A",
  gray500: "#D0D0D0",
  white: "#FFFFFF",
  gray200: "#F9F9FC",
  black: "#212121",
  gray900: "#616161",
  gold: "#F7B840",
};

const userValidationSchema = yup.object().shape({
  name: yup.string().min(4).required("Please, provide your name!"),
  email: yup.string().email().required(),
  phone: yup.number().min(10).max(10),
  accepted: yup.bool().oneOf([true], "Field must be checked"),
  password: yup.string().min(4, "Pin must be of 4 digits").max(4).required(),
  confirm: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default FormicWalaForm = () => {
  const [pickerResponse, setPickerResponse] = useState(null);

  const inputStyle = {
    width: "100%",
    marginTop: 8,
    borderWidth: 1,
    padding: 16,
    borderColor: Colors.primary,
    borderRadius: 4,
    height: 50,
    outline: "none",
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirm: "",
          phone: "",
          district: "",
          city: "",
          street: "",
          accepted: false,
          image: "",
        }}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
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
                  onPress={() => {
                    onImageLibraryPress();
                  }}
                >
                  <Image
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/qqlret7skn-I155%3A2151%3B22%3A106?alt=media&token=505e72a8-f261-4f38-81e1-bfae6f037c3e",
                    }}
                    style={{
                      right: 3,
                      height: 75,
                      width: 75,
                      borderRadius: 24,
                      objectFit: "contain",
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      marginTop: 10,
                      textAlign: "center",
                      color: Colors.primary,
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
                    inputStyle,
                    {
                      borderColor: !touched.name
                        ? Colors.gray900
                        : !errors.name
                        ? Colors.primary
                        : "red",
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
                    inputStyle,
                    {
                      borderColor: !touched.email
                        ? Colors.gray900
                        : !errors.email
                        ? Colors.primary
                        : "red",
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
                  style={[
                    inputStyle,
                    {
                      borderColor: !touched.email
                        ? Colors.gray900
                        : !errors.email
                        ? Colors.primary
                        : "red",
                    },
                  ]}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={() => setFieldTouched("phone")}
                  placeholder="Phone Number"
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
                <Text>Password *</Text>
                <TextInput
                  style={[
                    inputStyle,
                    {
                      borderColor: !touched.email
                        ? Colors.gray900
                        : !errors.email
                        ? Colors.primary
                        : "red",
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
                    inputStyle,
                    {
                      borderColor: !touched.email
                        ? Colors.gray900
                        : !errors.email
                        ? Colors.primary
                        : "red",
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
                    values.accepted
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
  },
  formContainer: {
    marginTop: 50,
    // paddingHorizontal: 24
  },
});
console.disableYellowBox = true;
