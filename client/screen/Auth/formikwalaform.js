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

import { DistrictsList } from "./district";
import * as ImagePicker from "expo-image-picker";

import * as yup from "yup";
import { Formik } from "formik";
import ModalPopoup from "./Model";
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
  email: yup.string().email().required(),
  phone: yup.string().min(10).max(10).required(),
  accepted: yup.bool().oneOf([true], "Field must be checked"),
  password: yup.string().min(4, "Pin must be of 4 digits").max(4).required(),
  gender: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().min(6).required(),
  confirm: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  image: yup.string().required(),
});

export default App = () => {
  // const [district, setDistrict] = useState();

  let popupRef = createRef();
  const [citiesList, setCitiesList] = useState([]);
  const onImageLibraryPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      return result.uri;
      // return result.uri;
    }
  };
  return (
    <ScrollView style={styles.container}>
      <ModalPopoup
        ref={(target) => (popupRef = target)}
        onTouchOutside={() => popupRef.close()}
      />
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
        onSubmit={(values) => console.log(JSON.stringify(values))}
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
                    let img = await onImageLibraryPress();
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
                  <Text style={{ color: "red" }}>{errors.email}</Text>
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
                      : !errors.gender
                      ? { borderColor: Colors.primary }
                      : "red",
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
                {touched.gender && errors.gender && (
                  <Text style={{ color: "red" }}>{errors.gender}</Text>
                )}
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
                      : !errors.district
                      ? { borderColor: Colors.primary }
                      : "red",
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={DistrictsList}
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
                {touched.district && errors.district && (
                  <Text style={{ color: "red" }}>{errors.district}</Text>
                )}
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
                      : !errors.city
                      ? { borderColor: Colors.primary }
                      : "red",
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
                {touched.city && errors.city && (
                  <Text style={{ color: "red" }}>{errors.city}</Text>
                )}
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
