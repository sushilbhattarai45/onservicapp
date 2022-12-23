import React, {
  useState,
  createRef,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Pressable,
  Linking,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import QRCode from "react-native-qrcode-svg";
import Header from "../component/Header";
import Icon from "../component/Icon";
import ImageSliderComponent from "../component/imageSlider";
import { Colors } from "../styles/main";
import Button from "../component/buttonComponent";
import ModalPopup from "../component/Modal";
import ReviewCard from "../component/ReviewCard";
import { axiosInstance } from "../component/tools";
import AppContext from "../component/appContext";
import SubCatCard from "../component/subCatCard";
import { API_KEY } from "@env";

import { Video } from "expo-av";

const ActionIcon = ({ name, onPress, color }) => {
  return (
    <Pressable style={styles.actionIcon} onPress={onPress}>
      <Icon
        {...{ name }}
        {...{ onPress }}
        size={24}
        color={color ? color : Colors.gray900}
      />
    </Pressable>
  );
};

const SkillPill = ({ name }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 40,
        borderWidth: 1.5,
        borderColor: Colors.gray500,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      <Text
        style={{ fontSize: 14, color: Colors.black, fontFamily: "SemiBold" }}
      >
        {name}
      </Text>
    </View>
  );
};
const SPProfileScreen = ({ navigation, route }) => {
  const { sp } = route.params;
  const { isitsp } = useContext(AppContext);
  const { user, snearyou, livedistrict } = useContext(AppContext);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [bookmarked, setBookmarked] = useState();
  const [showReviews, setShowReviews] = useState(sp?.sp_showReview);
  const [spStatus, setSpStatus] = useState(
    sp?.sp_status == "ACTIVE" ? true : false
  );
  const [sp_rated, setSp_Rated] = useState(0);

  const popup = createRef();
  const popupQr = createRef();
  const popupSettings = createRef();
  const popupNumber = createRef();
  const video = useRef(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [bookIcon, setBookIcon] = useState("false");
  const onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    if (fullscreenUpdate == 3) {
      setVideoMuted(true);
    }
  };
  const showVideoInFullscreen = async () => {
    setVideoMuted(false);
    await video.current?.presentFullscreenPlayer();
  };

  const postReview = (rating, review) => {
    axiosInstance
      .post("/review/post", {
        GIVEN_API_KEY: API_KEY,
        user_contact: user,
        sp_contact: sp?.sp_contact,
        review_bio: review,
        review_stars: rating,
      })
      .then(() => {
        getReviews();
      });
  };
  const getReviews = async () => {
    let res = await axiosInstance.post("/review/getSpreview", {
      sp_id: sp?.sp_contact,
      GIVEN_API_KEY: API_KEY,
    });
    let d = res?.data?.data;
    let sum = 0;
    if (d?.length > 0) {
      d?.map((item) => {
        sum += item.review_stars;
      });
      setSp_Rated((sum / d?.length).toFixed(2));
    }
    setReviews(d);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkBookmarked();
      getReviews();
      //Put your Data loading function here instead of my loadData()
    });
    async function checkBookmarked() {
      console.log(sp?.sp_contact);

      let res = await axiosInstance.post("/bm/check", {
        user_id: user,
        sp_id: sp?.sp_contact,
        GIVEN_API_KEY: API_KEY,
      });
      if (!res.error) {
        // alert(sp?.sp_contact + user);
        // alert(res.data.statuscode);
        if (res.data.statuscode == 201) {
          setBookmarked(res.data);
          setBookIcon("true");
        } else {
          setBookmarked(null);
          setBookIcon("false");
        }
      }
    }
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Header
          style={{
            position: "absolute",
            zIndex: 10,
            paddingHorizontal: 24,
          }}
          icon="arrow-left-line"
          onPressIcon={() => navigation.goBack()}
          right={
            isitsp ? (
              <View style={{ flexDirection: "row" }}>
                {isitsp.sp_contact == sp?.sp_contact && (
                  <Icon
                    onPress={() => navigation.navigate("UpdateSP", { sp: sp })}
                    style={{
                      marginRight: 12,
                    }}
                    name="pencil-fill"
                    size={24}
                    color="white"
                  />
                )}
                {sp?.sp_contact == user ? (
                  <Icon
                    name="qr-code-line"
                    size={24}
                    style={{ marginRight: 12 }}
                    color={Colors.white}
                    onPress={() => popupQr.current.show()}
                  />
                ) : null}
                {isitsp.sp_contact == sp?.sp_contact && (
                  <Icon
                    onPress={() => popupSettings.current.show()}
                    name="settings-line"
                    size={24}
                    color="white"
                  />
                )}
              </View>
            ) : (
              <Icon
                name="qr-code-line"
                size={24}
                style={styles.icon}
                color={Colors.white}
                onPress={() => popupQr.current.show()}
              />
            )
          }
          color={Colors.white}
        />
        {sp?.sp_media?.video ? (
          <TouchableOpacity
            activeOpacity={1}
            style={{ backgroundColor: Colors.primary }}
            onPress={async () => {
              showVideoInFullscreen();
            }}
          >
            <Video
              ref={video}
              style={styles.video}
              source={{ uri: sp?.sp_media?.video }}
              isMuted={videoMuted}
              shouldPlay
              resizeMode="cover"
              pointerEvents="none"
              onFullscreenUpdate={onFullscreenUpdate}
              isLooping
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require("../assets/images/logo1.png")}
            style={{
              ...styles.video,
              backgroundColor: Colors.gray500,
              height: 200,
            }}
          />
        )}
        {/* <Text>Hello</Text> */}
        <View style={styles.profileContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingHorizontal: 24,
            }}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: sp?.sp_profileImage,
                headers: {
                  Accept: "*/*",
                },
              }}
            />
            {/* Buttons call/message/bookmark */}
            <View
              style={{
                flex: 1,
                alignSelf: "flex-end",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: "auto",
                flexWrap: "wrap",
              }}
            >
              <ActionIcon
                name="phone-line"
                onPress={() => {
                  popupNumber.current.show();
                }}
              />
              <Text>{sp?.user_profileImage}</Text>
              {sp?.sp_whatsapp && (
                <ActionIcon
                  name="chat-1-line"
                  onPress={() => {
                    let url =
                      "whatsapp://send?text=" +
                      "Hello" +
                      "&phone=+977" +
                      sp?.sp_whatsapp;
                    Linking.openURL(url)
                      .then((data) => {
                        console.log("WhatsApp Opened");
                      })
                      .catch(() => {
                        alert("Make sure Whatsapp installed on your device");
                      });
                  }}
                />
              )}
              {sp?.sp_location && (
                <ActionIcon
                  name="map-pin-line"
                  onPress={() => Linking.openURL(sp?.sp_location)}
                />
              )}
              {sp?.sp_tiktok && (
                <Pressable
                  style={{
                    ...styles.actionIcon,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => Linking.openURL(sp?.sp_tiktok)}
                >
                  <Image
                    source={require("../assets/images/tiktok.png")}
                    style={{ height: 24, width: 24 }}
                  />
                </Pressable>
              )}
              {user ? (
                bookIcon == "true" ? (
                  <ActionIcon
                    name="bookmark-2-fill"
                    color={Colors.primary}
                    onPress={async () => {
                      const deleteBm = await axiosInstance.post("/bm/delete", {
                        GIVEN_API_KEY: API_KEY,
                        user_id: user,
                        sp_id: sp?.sp_contact,
                      });
                      setBookIcon("false");
                      setBookmarked(null);
                    }}
                  />
                ) : (
                  <ActionIcon
                    name="bookmark-2-line"
                    color={Colors.gray900}
                    onPress={async () => {
                      const postBm = await axiosInstance.post("/bm/post", {
                        GIVEN_API_KEY: API_KEY,
                        user_id: user,
                        sp_id: sp?.sp_contact,
                      });
                      setBookIcon("true");

                      setBookmarked(postBm.data);
                    }}
                  />
                )
              ) : null}
            </View>
          </View>
          {/* N
          ame */}

          <Text
            style={{
              marginTop: 12,
              fontFamily: "Bold",
              fontSize: 20,
              alignItems: "center",
              color: Colors.black,
              paddingHorizontal: 24,
            }}
          >
            {" "}
            {sp?.sp_name}{" "}
            {sp?.sp_verified && (
              <Icon
                name="checkbox-circle-fill"
                color="#2A65FD"
                size={16}
                style={{ marginLeft: 8 }}
              />
            )}
          </Text>
          {/* Date and address Info */}
          <View style={{ flexDirection: "row", paddingHorizontal: 24 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                alignItems: "center",
              }}
            >
              <Icon name="map-pin-line" color={Colors.gray900} size={14} />
              <Text
                style={{
                  fontFamily: "SemiBold",
                  fontSize: 12,
                  color: Colors.gray900,
                  marginLeft: 4,
                }}
              >
                {sp?.sp_street + " " + sp?.sp_city + " " + sp?.sp_district}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                alignItems: "center",
                marginLeft: 12,
              }}
            >
              <Icon name="calendar-2-line" color={Colors.gray900} size={14} />
              <Text
                style={{
                  fontFamily: "SemiBold",
                  fontSize: 12,
                  color: Colors.gray900,
                  marginLeft: 4,
                }}
              >
                {sp?.sp_toc?.date}
              </Text>
            </View>
          </View>
          {/* Skills */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 16,
              paddingHorizontal: 24,
            }}
          >
            {sp?.sp_skills?.map((name) => (
              <SkillPill name={name} />
            ))}
          </View>
          {/* About */}
          <>
            <Text
              style={{
                fontFamily: "SemiBold",
                fontSize: 16,
                marginTop: 24,
                marginBottom: 8,
                color: Colors.black,
                paddingHorizontal: 24,
              }}
            >
              About Work
            </Text>
            <Text
              style={{
                paddingHorizontal: 24,

                fontFamily: "Regular",
                fontSize: 14,
                color: Colors.gray900,
                letterSpacing: 0.2,
              }}
            >
              {sp?.sp_bio}
            </Text>
          </>
          {/* Slider */}
          <ImageSliderComponent
            data={sp?.sp_media?.photo}
            style={{ marginTop: 24 }}
          />
          <Pressable
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 32,
            }}
            onPress={() =>
              user && user != sp?.sp_contact ? popup.current.show() : null
            }
          >
            <Text style={{ fontSize: 40, fontFamily: "Bold" }}>
              {sp_rated ? sp_rated : 0}
              <Text style={{ fontSize: 20, fontFamily: "Regular" }}>/5</Text>
            </Text>
            <View>
              <StarRating
                starSize={40}
                onChange={() => null}
                rating={sp_rated ? sp_rated : 0}
                color={Colors.gold}
                starStyle={{ marginLeft: -5 }}
                animationConfig={{
                  scale: 1,
                  duration: 0,
                  delay: 0,
                }}
              />
            </View>
            <Text
              style={{ fontSize: 12, fontFamily: "Regular", marginTop: 12 }}
            >
              {reviews?.length} Reviews
            </Text>
            {user && user != sp?.sp_contact ? (
              <View style={{ marginTop: 24 }}>
                <Button label="Rate Us" onPress={() => popup.current.show()} />
              </View>
            ) : null}
          </Pressable>
          {(showReviews || sp?.sp_contact == isitsp?.sp_contact) && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 24,
                  marginTop: 32,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "SemiBold",
                    color: Colors.black,
                  }}
                >
                  User Reviews
                </Text>
                {reviews !== [] && reviews && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Regular",
                      color: Colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                    onPress={() =>
                      navigation.navigate("ViewAllReviews", {
                        reviews: reviews,
                      })
                    }
                  >
                    View All
                  </Text>
                )}
              </View>
              <View>
                {reviews !== [] && reviews ? (
                  reviews?.slice(0, 5).map((item, index) => {
                    return (
                      <ReviewCard
                        image={item.user_profile_image}
                        rating={item.review_stars}
                        name={item.user_name}
                        review={item.review_bio}
                        doc={item.review_doc}
                      />
                    );
                  })
                ) : (
                  <Text
                    style={{
                      marginVertical: 24,
                      color: Colors.black,
                      textAlign: "center",
                      fontFamily: "Regular",
                    }}
                  >
                    No Reviews Yet
                  </Text>
                )}
              </View>
            </>
          )}
          {/* <FlatList
            style={{}}
            showsHorizontalScrollIndicator={false}
            data={reviews.splice(0, 5)}
            renderItem={({ item, index }) => {
              return (
               
              );
            }}
            keyExtractor={(item, index) => item._id}
          /> */}
          {/* Services Near you */}
          <View>
            <Text
              style={[
                styles.subCategoriesContainerHeading,
                { marginTop: 32, paddingHorizontal: 24 },
              ]}
            >
              Services Near You
            </Text>
            {snearyou ? (
              <FlatList
                style={{ marginBottom: 32 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={snearyou}
                renderItem={({ item, index }) => {
                  let isEnd = index === snearyou.length - 1;
                  return (
                    <SubCatCard
                      key={item._id}
                      district={livedistrict}
                      image={item.subCat_photo}
                      category_id={item._id}
                      name={item.subCat_name}
                      containerStyle={{
                        marginLeft: index === 0 ? 24 : 0,
                        marginRight: isEnd ? 24 : 0,
                      }}
                    />
                  );
                }}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        height: "100%",
                        width: 20,
                        backgroundColor: Colors.gray200,
                      }}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View>
                <Text
                  style={{
                    justifyContent: "center",
                    // alignItems: "center",
                    fontFamily: "Regular",
                    textAlign: "center",
                    paddingBottom: 10,
                  }}
                >
                  No Data found for your current Location! Still Searching
                </Text>
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </View>
            )}
          </View>
          {/* Footer */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingVertical: 30,
              backgroundColor: Colors.white,
              marginTop: 24,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/onservicLogo.png")}
              style={{ height: 30, width: 180 }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Icon name="phone-fill" size={14} color={Colors.gray900} />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 12,
                    color: Colors.gray900,
                  }}
                >
                  {" "}
                  NTC 9762592690
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Icon name="phone-fill" size={14} color={Colors.gray900} />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 12,
                    color: Colors.gray900,
                  }}
                >
                  {" "}
                  Ncell 9810623203
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Icon name="map-pin-fill" size={14} color={Colors.gray900} />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 12,
                    color: Colors.gray900,
                  }}
                >
                  {" "}
                  Butwal 11, Rupandehi
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Icon name="chat-1-fill" size={14} color={Colors.gray900} />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 12,
                    color: Colors.gray900,
                  }}
                >
                  {" "}
                  contact@onservic.com{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ModalPopup
        ref={popupQr}
        animationType="fade"
        onTouchOutside={() => {
          popupQr.current.close();
        }}
      >
        <View
          style={{
            alignItems: "center",
            // paddingHorizontal: 16,
            paddingVertical: 16,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: 32,
              fontFamily: "Black",
              marginBottom: 24,
            }}
          >
            Share Your Profile
          </Text>
          <View>
            <QRCode
              value={sp?.sp_contact}
              color={Colors.primary}
              size={200}
              // backgroundColor="black"
            />
            <Text
              style={{
                color: Colors.primary,
                fontSize: 24,
                fontFamily: "Black",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              OnServic
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 24,
                fontFamily: "Black",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {sp?.sp_name}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontFamily: "Regular",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {sp?.sp_officeNumber ? sp?.sp_officeNumber : sp?.sp_contact}
            </Text>
          </View>
        </View>
      </ModalPopup>
      <ModalPopup
        ref={popupSettings}
        animationType="fade"
        onTouchOutside={() => {
          popupSettings.current.close();
        }}
      >
        <View
          style={{
            alignItems: "center",
            // paddingHorizontal: 16,
            paddingVertical: 16,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: 32,
              fontFamily: "Black",
              marginBottom: 24,
            }}
          >
            Settings
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              // backgroundColor:'red'
            }}
          >
            <Text style={{ color: Colors.black, fontFamily: "Regular" }}>
              Show Reviews
            </Text>
            <Switch
              trackColor={{ false: Colors.gray500, true: Colors.gray500 }}
              thumbColor={showReviews ? Colors.primary : Colors.gray900}
              ios_backgroundColor="#3e3e3e"
              onValueChange={async (value) => {
                let res = axiosInstance
                  .post("/sp/updateSettings", {
                    GIVEN_API_KEY: API_KEY,
                    sp_status: spStatus,
                    sp_contact: sp?.sp_contact,
                    sp_showReview: value,
                  })
                  .then(() => setShowReviews(value));
              }}
              value={showReviews}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              // backgroundColor:'red'
            }}
          >
            <Text style={{ color: Colors.black, fontFamily: "Regular" }}>
              Active
            </Text>
            <Switch
              trackColor={{ false: Colors.gray500, true: Colors.gray500 }}
              thumbColor={spStatus ? Colors.primary : Colors.gray900}
              ios_backgroundColor="#3e3e3e"
              onValueChange={async (value) => {
                let res = axiosInstance
                  .post("/sp/updateSettings", {
                    GIVEN_API_KEY: API_KEY,
                    sp_status: value ? "ACTIVE" : "INACTIVE",
                    sp_contact: sp?.sp_contact,
                    sp_showReview: showReviews,
                  })
                  .then(() => setSpStatus(value));
              }}
              value={spStatus}
            />
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: Colors.black, fontFamily: "Regular" }}>
              Expiry Date
            </Text>
            <Text style={{ color: Colors.black, fontFamily: "Regular" }}>
              stg date
            </Text>
          </View> */}
        </View>
      </ModalPopup>
      <ModalPopup
        ref={popupNumber}
        animationType="fade"
        onTouchOutside={() => {
          popupNumber.current.close();
        }}
      >
        <View
          style={{
            alignItems: "center",
            // paddingHorizontal: 16,
            paddingVertical: 16,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: 24,
              fontFamily: "Black",
              marginBottom: 24,
            }}
          >
            Phone Number
          </Text>

          {sp?.sp_officeNumber && (
            <TouchableOpacity
              style={{
                borderBottomColor: Colors.gray500,
                borderBottomWidth: 1,
                backgroundColor: Colors.white,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                paddingVertical: 12,
                // backgroundColor:'red'
              }}
              onPress={() => Linking.openURL(`tel:${sp?.sp_contact}`)}
            >
              <Icon name="phone-fill" color={Colors.gray900} size={20} />
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "Regular",
                  textAlignVertical: "center",
                  marginLeft: 12,
                }}
              >
                {sp?.sp_officeNumber}
              </Text>
            </TouchableOpacity>
          )}
          {sp?.sp_contact && (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                paddingVertical: 12,
                // backgroundColor:'red'
              }}
              onPress={() => Linking.openURL(`tel:${sp?.sp_contact}`)}
            >
              <Icon name="phone-fill" color={Colors.gray900} size={20} />
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "Regular",
                  textAlignVertical: "center",
                  marginLeft: 12,
                }}
              >
                {sp?.sp_contact}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ModalPopup>

      <ModalPopup
        ref={popup}
        animationType="fade"
        containerStyle={{
          width: "100%",
          marginTop: "auto",
          alignItems: "center",
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
        }}
        onTouchOutside={() => popup.current.close()}
      >
        <View
          style={{
            width: 50,
            height: 2.5,
            backgroundColor: Colors.black,
            borderRadius: 5,
            marginBottom: 24,
          }}
        ></View>
        <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
          Rate and Review
        </Text>
        <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
          Please rate the user and review your experience
        </Text>
        <View style={{ marginVertical: 30 }}>
          <StarRating
            starSize={40}
            onChange={(va) => setRating(va)}
            rating={rating}
            color={Colors.gold}
            starStyle={{ marginLeft: -5 }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text>Review your Service Provider (max 100)</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{
              width: "100%",
              marginTop: 8,
              padding: 16,
              borderRadius: 4,
              height: 100,
              textAlignVertical: "top",
              backgroundColor: Colors.gray200,
            }}
            placeholder="Share your experience"
            value={review}
            onChangeText={setReview}
          />
          {reviewError ? (
            <Text style={{ color: "red" }}>{reviewError}</Text>
          ) : null}
        </View>
        <View style={{ width: "100%", marginTop: 40 }}>
          <Button
            label="Share Review"
            onPress={() => {
              if (review.length < 3) {
                setReviewError("Minimum 3 characters is required");
              } else if (review.split(" ").length > 50) {
                setReviewError("Max no of word is 50");
              } else {
                setReviewError(false);
                postReview(rating, review);
                setRating(0);
                setReview("");
                popup.current.close();
              }
            }}
          />
        </View>
      </ModalPopup>
      {/* <StatusBar backgroundColor="#000000"/> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight ,
    // paddingHorizontal: 24,
    backgroundColor: Colors.gray200,
  },
  profileContent: {
    flex: 1,
    backgroundColor: Colors.gray200,
    marginTop: -24,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  profileImage: {
    // position: "relative",
    width: 130,
    height: 130,
    borderRadius: 20,
    marginTop: -40,
  },
  actionIcon: {
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.gray500,
    borderRadius: 200,
    marginLeft: 8,
    marginTop: 8,
    // marginBottom:8
  },
  subCategoriesContainerHeading: {
    marginBottom: 24,
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  video: {
    height: 300,
    width: Dimensions.get("window").width,
  },
});

export default SPProfileScreen;
