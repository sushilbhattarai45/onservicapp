import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors } from "../../styles/main";
import Header from "../../component/Header";
import { Formik } from "formik";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Districts } from "../../component/district";
import Checkbox from "expo-checkbox";
import Icon from "../../component/Icon";

const gendersList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const SkillPill = ({ name, onPress }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: Colors.gray500,
        marginRight: 6,
        marginBottom: 6,
        flexDirection: "row",
      }}
    >
      <Text
        style={{ fontSize: 14, color: Colors.black, fontFamily: "SemiBold" }}
      >
        {name}
      </Text>
      <Icon
        style={{ marginLeft: 4 }}
        color={Colors.gray900}
        name="close-fill"
        onPress={onPress}
        size={20}
      />
    </View>
  );
};

const BecomeSPScreen = () => {
  const [citiesList, setCitiesList] = useState([]);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.gray200 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header icon="arrow-left-line" />
        <Text style={styles.heading}>BE OUR PARTNER</Text>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirm: "",
              phone: "",
              officePhone: "",
              district: "",
              gender: "",
              city: "",
              street: "",
              accepted: false,
              googlemaplink: "",
              skills: [],
              photos: [],
              video: [],
            }}
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
                  <Text>Skills *</Text>
                  <MultiSelect
                    style={styles.inputStyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={values.skills}
                    containerStyle={{ marginTop: 24 }}
                    onChange={(item) => {
                      setFieldValue("skills", item);
                    }}
                    renderSelectedItem={(item, unselect) => (
                      <SkillPill name={item.label} onPress={unselect} />
                    )}
                    selectedStyle={styles.selectedStyle}
                  />
                  {!values.city && touched.city ? (
                    <Text style={{ color: "red" }}>{errors.city}</Text>
                  ) : null}
                </View>
                {/* SCheckBox */}
                <View
                  style={{
                    marginTop: 24,
                    marginRight: 10,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Checkbox
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
                      </Text>
                    </Text>
                  }
                </View>
                {/* Submit Button */}
                <Pressable
                  style={{
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    justifyContent: "center",
                    height: 50,
                    marginTop: 24,
                    marginBottom: 24,
                  }}
                  onPress={handleSubmit}
                >
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
                </Pressable>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight + 16,
    backgroundColor: Colors.gray200,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 32,
    fontFamily: "Black",
    color: Colors.black,
    marginTop: 32,
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

export default BecomeSPScreen;
