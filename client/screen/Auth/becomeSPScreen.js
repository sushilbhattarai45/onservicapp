import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import * as yup from "yup";

import { Colors } from "../../styles/main";
import Header from "../../component/Header";
import { Formik } from "formik";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Districts } from "../../component/district";
import Checkbox from "expo-checkbox";
import Icon from "../../component/Icon";
import { axiosInstance } from "../../component/tools";
import axios from "axios";

const BASE_OUR_API_URL = "http://192.168.100.11:3001";

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
        marginTop: 8,
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
  officePhone: yup
    .number("Phone number must be Numeric")
    .min(10)
    .required("Please, provide your Phone Number!"),

  accepted: yup.bool().oneOf([true], "Field must be checked"),
  gender: yup.string().required("Please, select your gender"),
  district: yup.string().required("Please, provide your district!"),
  city: yup.string().required("Please, provide your city!"),
  street: yup
    .string()
    .required()
    .min(6)
    .required("Please, provide your street!"),
  // image: yup.string().required(),
  skills: yup.array().of(yup.string()).required(),
});

const BecomeSPScreen = () => {
  const [citiesList, setCitiesList] = useState([]);

  const submit = async (values) => {
    console.log(values);
    let response = await axiosInstance.post("/sp/postsp/", {
      GIVEN_API_KEY: "AXCF",
      sp_name: values.name,
      sp_email: values.email,
      sp_contact: values.phone,
      sp_district: values.district,
      sp_officenumber: values.officePhone,
      sp_skills: values.skills,
      sp_city: values.city,
      sp_street: values.street,
      sp_gender: values.gender,
    });
    console.log(response.data);
  };
  const [file, setFile] = useState();
  const [imgFile, setImgFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vdoFile, setVdoFile] = useState([]);
  const [vdoloading, setVdoLoading] = useState(false);
  // const mulFile = [];
  const [img, setImg] = useState(false);
  const [vdo, setVdo] = useState(false);

  const selectFile = async () => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,

        mediaType: "video",
      });

      console.log(result);
      console.log("okok" + file);
      // result.selected.map((item) => {
      //   mulFile.push(item);
      // });
      // uploadImage();
      if (!result.cancelled) {
        console.log(result.selected);
        setImgFile((prev) => {
          setLoading(false);
          if (result?.selected) {
            return [...prev, ...result.selected];

            setLoading(false);
          } else return [...prev, result];
        });
        setImg(true);
        setLoading(false);
        // console.log("ok" + JSON.stringify(mulFile));
      } else {
        setImg(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const selectVideo = async () => {
    setVdoLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        mediaType: "video",
      });

      console.log(result);
      console.log("okok" + file);
      // result.selected.map((item) => {
      //   mulFile.push(item);
      // });
      // uploadImage();
      if (!result.cancelled) {
        console.log(result.selected);
        setVdoFile((prev) => {
          setVdoLoading(false);
          if (result?.selected) {
            return [...prev, ...result.selected];

            setVdoLoading(false);
          } else return [...prev, result];
        });
        setVdo(true);
        setVdoLoading(false);
        // console.log("ok" + JSON.stringify(mulFile));
      } else {
        setVdo(false);
        setVdoLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      const finalData = [];
      // setError(false);
      // if not empty creating a form data to send to upload the image to the server
      // alert("ok");
      file.map(async (item) => {
        const imageToUpload = item;
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
        // console.log("s" + serverUrl);
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
        setImg(true);
        return finalname;
      });
      console.log(finalData);
    } catch (e) {
      alert("Error! Sorry");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.gray200 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header icon="arrow-left-line" />
        <Text style={styles.heading}>BE OUR PARTNER{file}</Text>
        {/* <KeyboardAvoidingView style={{ flex: 1 }}> */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            officePhone: "",
            district: "",
            gender: "",
            city: "",
            street: "",
            accepted: false,
            // googlemaplink: "",
            skills: [],
            // photos: [],
            // video: [],
          }}
          onSubmit={submit}
          validationSchema={userValidationSchema}
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
                  placeholderTextColor={Colors.gray900}
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
                  placeholderTextColor={Colors.gray900}
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
                  placeholderTextColor={Colors.gray900}
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
                <Text>Office Phone Number *</Text>
                <TextInput
                  keyboardType="numeric"
                  maxLength={10}
                  style={[
                    styles.inputStyle,
                    {
                      borderColor: !touched.officePhone
                        ? Colors.gray900
                        : errors.officePhone
                        ? "red"
                        : Colors.primary,
                    },
                  ]}
                  value={values.officePhone}
                  onChangeText={handleChange("officePhone")}
                  onBlur={() => setFieldTouched("officePhone")}
                  placeholder="Office Phone Number"
                  placeholderTextColor={Colors.gray900}
                />
                {touched.officePhone && errors.officePhone && (
                  <Text style={{ color: "red" }}>{errors.officePhone}</Text>
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
                  placeholderStyle={{ color: Colors.gray900, fontSize: 14 }}
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
                  placeholderStyle={{ color: Colors.gray900, fontSize: 14 }}
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
                  placeholderStyle={{ color: Colors.gray900, fontSize: 14 }}
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
                  placeholderTextColor={Colors.gray900}
                  // placeholderStyle={{ color: Colors.gray900 }}
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
                  placeholderStyle={{ color: Colors.gray900, fontSize: 14 }}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={data}
                  renderRightIcon={() => (
                    <Icon name="add-line" size={16} color={Colors.black} />
                  )}
                  labelField="label"
                  valueField="value"
                  placeholder="Enter your Skills"
                  searchPlaceholder="Search..."
                  value={values.skills}
                  containerStyle={{ marginTop: 24 }}
                  onBlur={() => setFieldTouched("skills")}
                  onChange={(item) => {
                    setFieldValue("skills", item);
                    console.log(item);
                  }}
                  style={[
                    styles.inputStyle,
                    {
                      borderColor: !touched.skills
                        ? Colors.gray900
                        : errors.skills
                        ? "red"
                        : Colors.primary,
                    },
                  ]}
                  renderSelectedItem={(item, unselect) => (
                    <SkillPill name={item.label} onPress={unselect} />
                  )}
                />
                {!values.skills && touched.skills ? (
                  <Text style={{ color: "red" }}>{errors.skills}</Text>
                ) : null}
              </View>
              <View style={{ marginTop: 12 }}>
                <Text>Upload Photos of your work!</Text>
                <View
                  style={{
                    display: "flex",
                    marginTop: 8,
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    padding: 10,
                    borderWidth: 0.8,
                    borderColor: Colors.gray900,
                    flexDirection: "row",
                  }}
                >
                  {img
                    ? imgFile?.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => {
                            // setImgFile((prev) => {
                            //   prev.filter((item1, index1) => index1 != index);
                            // });

                            setImgFile((current) =>
                              current.filter((file, idx) => idx !== index)
                            );
                          }}
                        >
                          <View
                            style={{
                              height: 60,
                              width: 60,
                              marginBottom: 6,
                              marginRight: 4,
                              position: "relative",
                              flexWrap: "wrap",
                              borderRadius: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              alignContent: "center",
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "white",
                                borderRadius: 20,
                                width: 20,
                                height: 20,
                                zIndex: 9,
                                top: -1.5,
                                right: -1.5,
                                position: "absolute",
                              }}
                            >
                              <Icon
                                style={{}}
                                name="close-circle-fill"
                                size={20}
                                color={Colors.gray900}
                              />
                            </View>
                            <Image
                              style={{
                                alignSelf: "center",
                                alignSelf: "center",
                                height: "100%",
                                borderRadius: 10,
                                width: "95%",
                              }}
                              source={{
                                uri: item?.uri
                                  ? item.uri
                                  : "https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png",
                                headers: {
                                  Accept: "*/*",
                                },
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      ))
                    : null}
                  {loading ? (
                    <ActivityIndicator
                      size="large"
                      style={{
                        marginTop: 8,
                      }}
                      color="#0000ff"
                    />
                  ) : (
                    <View
                      style={{
                        height: 60,
                        width: 60,

                        borderRadius: 5,
                        marginBottom: 4,
                        marginLeft: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: Colors.gray500,
                      }}
                    >
                      <Icon
                        onPress={() => {
                          selectFile();
                        }}
                        name="add-line"
                        size={24}
                        color="white"
                      />
                    </View>
                  )}
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text>Upload Video of your work!</Text>
                <View
                  style={{
                    display: "flex",
                    marginTop: 8,
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    padding: 10,
                    borderWidth: 0.8,
                    borderColor: Colors.gray900,
                    flexDirection: "row",
                  }}
                >
                  {vdo
                    ? vdoFile?.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => {
                            // setImgFile((prev) => {
                            //   prev.filter((item1, index1) => index1 != index);
                            // });

                            setVdoFile((current) =>
                              current.filter((file, idx) => idx !== index)
                            );
                            setVdo(false);
                          }}
                        >
                          <View
                            style={{
                              height: 60,
                              width: 60,
                              marginBottom: 6,
                              marginRight: 4,
                              position: "relative",
                              flexWrap: "wrap",
                              borderRadius: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              alignContent: "center",
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "white",
                                borderRadius: 20,
                                width: 20,
                                height: 20,
                                zIndex: 9,
                                top: -1.5,
                                right: -1.5,
                                position: "absolute",
                              }}
                            >
                              <Icon
                                style={{}}
                                name="close-circle-fill"
                                size={20}
                                color={Colors.gray900}
                              />
                            </View>
                            <Image
                              style={{
                                alignSelf: "center",
                                alignSelf: "center",
                                height: "100%",
                                borderRadius: 10,
                                width: "95%",
                              }}
                              source={{
                                uri: item?.uri
                                  ? item.uri
                                  : "https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png",
                                headers: {
                                  Accept: "*/*",
                                },
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      ))
                    : null}
                  {vdoloading ? (
                    <ActivityIndicator
                      size="large"
                      style={{
                        marginTop: 8,
                      }}
                      color="#0000ff"
                    />
                  ) : !vdo ? (
                    <View
                      style={{
                        height: 60,
                        width: 60,

                        borderRadius: 5,
                        marginBottom: 4,
                        marginLeft: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: Colors.gray500,
                      }}
                    >
                      <Icon
                        onPress={() => {
                          selectVideo();
                        }}
                        name="add-line"
                        size={24}
                        color="white"
                      />
                    </View>
                  ) : null}
                </View>
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
                    onPress={() => uploadImage(imgFile)}
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
        {/* </KeyboardAvoidingView> */}
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
