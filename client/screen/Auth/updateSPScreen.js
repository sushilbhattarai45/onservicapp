import React, { useContext, useEffect, useState } from "react";
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
import { axiosInstance, BASE_OUR_API_URL } from "../../component/tools";
import AppContext from "../../component/appContext";
import { Video } from "expo-av";
const gendersList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
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
  phone: yup
    .number("Phone number must be Numeric")
    .min(10)
    .required("Please, provide your Phone Number!"),
  officePhone: yup.number("Phone number must be Numeric").min(10),

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
  skills: yup
    .array()
    .of(yup.string().required())
    .min(1, "required-field")
    .required(),
  photo: yup.array().min(1, "required-field").required(),
  video: yup.string().required(),
});

const UpdateSpScreen = ({ route, navigation }) => {
  let { sp } = route.params;
  const { userData } = useContext(AppContext);
  console.log(sp.sp_media.video);
  const { subCategories, setIsitSp } = useContext(AppContext);
  const [citiesList, setCitiesList] = useState([]);
  const [load, setLoad] = useState(false);

  const submit = async (values) => {
    setLoad(true);

    const img = await uploadImage(values.photo);
    let [vdo] = await uploadImage([values.video]);
    console.log(img);
    console.log(vdo);
    let response = axiosInstance
      .post("/sp/updateSp/", {
        GIVEN_API_KEY: "AXCF",
        sp_name: values.name,
        sp_contact: values.phone,
        sp_district: values.district,
        sp_officeNumber: values.officePhone,
        sp_skills: values.skills,
        sp_city: values.city,
        sp_street: values.street,
        sp_gender: values.gender,
        sp_media: {
          photo: img,
          video: vdo,
        },
        sp_profileImage: userData?.user_profileImage,
      })
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Sp", { sp: response?.data?.sp[0] });
      });
    setLoad(false);
  };
  const [loading, setLoading] = useState(false);
  const [vdoloading, setVdoLoading] = useState(false);
  // const mulFile = [];

  const selectFile = async (images) => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,

        mediaType: "image",
      });
      console.log(result);
      let files = {};
      if (!result.cancelled) {
        files = result.selected
          ? [...images, ...result.selected.map((s) => s.uri)]
          : [...images, result.uri];
        setLoading(false);
        return files;
      } else {
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
        selectionLimit: 1,
      });
      if (!result.cancelled) {
        setVdoLoading(false);
        return result.uri;
      } else {
        setVdoLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async (files) => {
    try {
      if (files === null) {
        setError({
          target: "image",
          message: "Sorry ,There is some error with the profile picture!!",
        });
        return null;
      }
      let finalData = [];
      finalData = await Promise.all(
        files.map(async (item) => {
          const data = new FormData();
          console.log(item);
          data.append(
            "profile",
            {
              uri: item,
              name: item,
              type: "image/jpg",
            },
            "myfile"
          );

          const response = await axiosInstance("/user/uploadImage", {
            method: "post",
            data: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
          let url = response?.data?.fileName;
          const filename = url.split("\\");
          const finalname = BASE_OUR_API_URL + "/" + filename[0];
          return finalname;
        })
      );
      console.log(finalData);
      return finalData;
    } catch (e) {
      console.log(e);
      // alert(e);
    }
  };
  useEffect(() => {
    Districts.map((item) => {
      if (sp?.sp_district == item.label) {
        setCitiesList(item.cities);
      }
    });
  });
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.gray200 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header icon="arrow-left-line" />
        <Text style={styles.heading}>Edit Your Profile</Text>
        {/* <KeyboardAvoidingView style={{ flex: 1 }}> */}
        <Formik
          initialValues={{
            name: sp?.sp_name,
            phone: sp?.sp_contact,
            officePhone: sp?.sp_officeNumber,
            district: sp?.sp_district,
            gender: sp?.sp_gender,
            city: sp?.sp_city,
            street: sp?.sp_street,
            accepted: false,
            // googlemaplink: "",
            skills: sp?.sp_skills,
            photo: sp?.sp_media.photo,
            video: sp?.sp_media.video,
          }}
          onSubmit={(values) => submit(values)}
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
                <Text>Phone Number *</Text>
                <TextInput
                  keyboardType="numeric"
                  maxLength={10}
                  editable={false}
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
                  data={subCategories}
                  renderRightIcon={() => (
                    <Icon name="add-line" size={16} color={Colors.black} />
                  )}
                  labelField="subCat_name"
                  valueField="subCat_name"
                  placeholder="Enter your Skills"
                  searchPlaceholder="Search..."
                  value={values.skills}
                  containerStyle={{ marginTop: 24 }}
                  onBlur={() => setFieldTouched("skills")}
                  onChange={(item) => {
                    console.log(item);
                    setFieldValue("skills", item);
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
                    <SkillPill
                      key={item.subCat_id.toString()}
                      name={item.subCat_name}
                      onPress={unselect}
                    />
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
                    borderColor: !touched.photo
                      ? Colors.gray900
                      : errors.photo
                      ? "red"
                      : Colors.primary,
                  }}
                >
                  {values.photo?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue(
                          "photo",
                          values.photo.filter((file, idx) => idx !== index)
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
                            uri: item,
                            headers: {
                              Accept: "*/*",
                            },
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                  {loading ? (
                    <ActivityIndicator
                      size="large"
                      style={{
                        marginTop: 8,
                      }}
                      color="#0000ff"
                    />
                  ) : (
                    <Pressable
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
                      onPress={async () => {
                        setFieldTouched("photo");
                        let a = await selectFile(values.photo);
                        setFieldValue("photo", a);
                        console.log(a);
                      }}
                    >
                      <Icon name="add-line" size={24} color="white" />
                    </Pressable>
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
                    borderColor: !touched.video
                      ? Colors.gray900
                      : errors.video
                      ? "red"
                      : Colors.primary,
                  }}
                >
                  {values.video ? (
                    <TouchableOpacity style={{ flex: 1 }}>
                      <View
                        style={{
                          flex: 1,

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
                            onPress={() => {
                              setFieldValue("video", "");
                            }}
                            style={{}}
                            name="close-circle-fill"
                            size={20}
                            color={Colors.gray900}
                          />
                        </View>
                        <Video
                          style={styles.video}
                          source={{ uri: values.video }}
                          resizeMode="cover"
                          pointerEvents="none"
                          useNativeControls
                          isLooping
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <Pressable
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
                      onPress={async () => {
                        setFieldTouched("video");
                        let a = await selectVideo();
                        setFieldValue("video", a);
                      }}
                    >
                      <Icon name="add-line" size={24} color="white" />
                    </Pressable>
                  )}
                  {vdoloading && (
                    <ActivityIndicator
                      size="large"
                      style={{
                        marginTop: 8,
                      }}
                      color="#0000ff"
                    />
                  )}
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
                    onPress={async () =>
                      console.log(await uploadImage(values.photo))
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
    marginBottom: 20,
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
  video: {
    height: 200,
    width: "100%",
  },
});

export default UpdateSpScreen;
