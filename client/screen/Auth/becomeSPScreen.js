import React, { useContext, useState } from "react";
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
import {
  axiosInstance,
  BASE_OUR_API_URL,
  uploadImage,
} from "../../component/tools";
import axios from "axios";
import AppContext from "../../component/appContext";
import { Video } from "expo-av";
import { API_KEY } from "@env";

const gendersList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Company", label: "Company" },
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
  email: yup.string().email("Please, provide a valid email!"),
  // .required("Please, provide your email!"),
  phone: yup
    .number()
    .typeError("Phone number must be a number")
    .min(10, "Please, provide a valid phone number!")
    .required("Please, provide your phone number!"),
  accepted: yup.bool().oneOf([true], "Field must be checked"),
  officePhone: yup
    .number()
    .typeError("Phone number must be a number")
    .min(1000000000, "Please, provide a valid phone number!"),
  accepted: yup.bool().oneOf([true], "Field must be checked"),
  bio: yup.string().min(6),

  accepted: yup.bool().oneOf([true], "Field must be checked"),
  gender: yup.string().required("Please, select your gender"),
  district: yup.string().required("Please, provide your district!"),
  city: yup.string().required("Please, provide your city!"),
  location: yup.string(),
  whatsapp: yup
    .string()
    .max(10, "Number cant be more than 10 Dgits.")
    .min(10, "Number cant be less than 10 Dgits."),
  tiktok: yup.string(),
  street: yup.string().min(6),
  // image: yup.string().required(),
  skills: yup
    .array()
    .of(yup.string().required())
    .min(1, "Please, select at least one skills.")
    .required(),
  photo: yup
    .array()
    .max(10, "Max of 10 photos can be added"),
  video: yup.string(),
});

const BecomeSPScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [whatsapp, setWhatsapp] = useState(null);

  const { subCategories, userData, setIsitSp } = useContext(AppContext);
  const [citiesList, setCitiesList] = useState([]);
  const [load, setLoad] = useState(false);
  const submit = async (values) => {
    setLoad(true);
    const img =
      values.photo.length > 0 ? await uploadImage(values.photo) : console.log('empty');
    let vdo = values.video ? await uploadImage([values.video]) : console.log('empty');
    console.log(img, vdo);

    if (isChecked) {
      post(values.officePhone, values, img, vdo[0]);
    } else {
      post(" ", values, img, vdo[0]);
    }
  };
  async function post(wnum, values, img, vdo) {
    let response = await axiosInstance.post("/sp/postsp/", {
      GIVEN_API_KEY: API_KEY,
      sp_name: values.name,
      sp_email: values.email,
      sp_contact: values.phone,
      sp_whatsapp: values.whatsapp,
      sp_district: values.district,
      sp_officeNumber: values.officePhone,
      sp_skills: values.skills,
      sp_city: values.city,
      sp_street: values.street,
      sp_gender: values.gender,
      sp_whatsapp: wnum,
      sp_bio: values.bio,
      sp_location: values.location,
      sp_tiktok: values.tiktok,
      sp_createdBy: "App",
      sp_platform: "APP",
      sp_media: {
        photo: img,
        video: vdo,
      },

      sp_profileImage: userData?.user_profileImage,
    });
    console.log(response.data);
    setLoad(false);
    setIsitSp(response.data.sp);
    navigation.navigate("Home");
  }
  const [loading, setLoading] = useState(false);
  const [vdoloading, setVdoLoading] = useState(false);
  // const mulFile = [];

  const selectFile = async (images) => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaType: "image",
        selectionLimit: 10,
      });
      let files = {};
      if (!result.cancelled) {
        files = result.selected
          ? [...images, ...result.selected.map((s) => s.uri)]
          : [...images, result.uri];
        setLoading(false);
        return files;
      } else {
        setLoading(false);
        return images;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const selectVideo = async () => {
    setVdoLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Videos",

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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.gray200 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header icon="arrow-left-line" />
        <Text style={styles.heading}>BE OUR PARTNER</Text>
        {/* <KeyboardAvoidingView style={{ flex: 1 }}> */}
        <Formik
          initialValues={{
            name: userData?.user_name,
            email: userData?.user_email,
            phone: userData?.user_contact,
            officePhone: "",
            district: "",
            gender: userData?.user_gender,
            whatsapp: "",
            city: "",
            bio: "",
            street: userData?.user_street,
            accepted: false,
            location: userData?.sp_location,
            tiktok: userData?.sp_tiktok,
            skills: [],
            photo: [],
            video: "",
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
                  placeholder="Email (optional)"
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
                <Text>Office/Business Number </Text>
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
                  placeholder="Office Number (optional)"
                  placeholderTextColor={Colors.gray900}
                />
                {touched.officePhone && errors.officePhone && (
                  <Text style={{ color: "red" }}>{errors.officePhone}</Text>
                )}
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <Checkbox
                    value={isChecked}
                    onValueChange={(value) => {
                      setChecked(value);
                    }}
                    color={isChecked ? Colors.primary : undefined}
                  />
                  <Text style={{ marginLeft: 5 }}>
                    This number is your Whatsapp Number
                  </Text>
                </View>
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
                <Text>Bio </Text>
                <TextInput
                  style={[
                    styles.inputStyle,
                    {
                      borderColor: !touched.bio
                        ? Colors.gray900
                        : errors.bio
                        ? "red"
                        : Colors.primary,
                      height: 150,
                      textAlignVertical: "top",
                    },
                  ]}
                  multiline={true}
                  numberOfLines={5}
                  value={values.bio}
                  onChangeText={handleChange("bio")}
                  onBlur={() => setFieldTouched("bio")}
                  placeholder="Whats on your mind. (optional)"
                  placeholderTextColor={Colors.gray900}
                />
                {touched.bio && errors.bio && (
                  <Text style={{ color: "red" }}>{errors.bio}</Text>
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
                  placeholder="Street (optional)"
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
                <Text>TikTok Link </Text>
                <TextInput
                  style={[
                    styles.inputStyle,
                    {
                      borderColor: !touched.tiktok
                        ? Colors.gray900
                        : errors.tiktok
                        ? "red"
                        : Colors.primary,
                    },
                  ]}
                  value={values.tiktok}
                  onChangeText={handleChange("tiktok")}
                  onBlur={() => setFieldTouched("tiktok")}
                  placeholder="TikTok Link (optional)"
                  placeholderTextColor={Colors.gray900}
                  // placeholderStyle={{ color: Colors.gray900 }}
                />
                {touched.tiktok && errors.tiktok && (
                  <Text style={{ color: "red" }}>{errors.tiktok}</Text>
                )}
              </View>
              <View
                style={{
                  marginTop: 12,
                }}
              >
                <Text>Google Map Link </Text>
                <TextInput
                  style={[
                    styles.inputStyle,
                    {
                      borderColor: !touched.location
                        ? Colors.gray900
                        : errors.location
                        ? "red"
                        : Colors.primary,
                    },
                  ]}
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={() => setFieldTouched("location")}
                  placeholder="Google Map Link (optional)"
                  placeholderTextColor={Colors.gray900}
                  // placeholderStyle={{ color: Colors.gray900 }}
                />
                {touched.location && errors.location && (
                  <Text style={{ color: "red" }}>{errors.location}</Text>
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
                {touched.skills && errors.skills && (
                  <Text style={{ color: "red" }}>{errors.skills}</Text>
                )}
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
                  ) : values.photo.length != 10 ? (
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
                      }}
                    >
                      <Icon name="add-line" size={24} color="white" />
                    </Pressable>
                  ) : null}
                </View>
                {errors.photo && touched.photo ? (
                  <Text style={{ color: "red" }}>{errors.photo}</Text>
                ) : null}
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
                {errors.video && touched.video ? (
                  <Text style={{ color: "red" }}>{errors.video}</Text>
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

export default BecomeSPScreen;
