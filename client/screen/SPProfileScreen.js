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
  TouchableOpacity,
  Switch,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import QRCode from "react-native-qrcode-svg";
import Header from "../component/Header";
import Icon from "../component/Icon";
import ImageSliderComponent from "../component/imageSlider";
import { Colors } from "../styles/main";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import CategoryCard from "../component/categoryCard";
import Button from "../component/buttonComponent";
import ModalPopup from "../component/Modal";
import ReviewCard from "../component/ReviewCard";
import { axiosInstance } from "../component/tools";
import AppContext from "../component/appContext";
import BookMarkCard from "../component/bookmarkCard";

import { Video, AVPlaybackStatus } from "expo-av";

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
  console.log(sp);
  const { isitsp } = useContext(AppContext);
  console.log(sp?.sp_status, sp?.sp_showReview);
  const { subCategories, user } = useContext(AppContext);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [bookmarked, setBookmarked] = useState();
  const [showReviews, setShowReviews] = useState(sp?.sp_showReview);
  const [spStatus, setSpStatus] = useState(
    sp?.sp_status == "Active" ? true : false
  );
  const popup = createRef();
  const popupQr = createRef();
  const popupSettings = createRef();
  const video = useRef(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [bookIcon, setBookIcon] = useState("false");
  const onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    console.log("Update" + fullscreenUpdate);
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
        GIVEN_API_KEY: "AXCF",
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
      GIVEN_API_KEY: "AXCF",
    });
    let d = res?.data?.data.splice(0, 5);
    setReviews(d);
    console.log("Hello");
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkBookmarked();
      getReviews();
      //Put your Data loading function here instead of my loadData()
    });
    async function checkBookmarked() {
      let res = await axiosInstance.post("/bm/check", {
        user_id: user,
        sp_id: sp?.sp_contact,
        GIVEN_API_KEY: "AXCF",
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
        // console.log("Bookmarked:" + res.data.data);
      }
    }
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Header
          style={{ position: "absolute", zIndex: 10, paddingHorizontal: 24 }}
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
                <Icon
                  name="qr-code-line"
                  size={24}
                  style={{ marginRight: 12 }}
                  color={Colors.white}
                  onPress={() => popupQr.current.show()}
                />
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
        <TouchableOpacity
          activeOpacity={1}
          style={{ backgroundColor: "red" }}
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
            <View style={{ flexDirection: "row", marginBottom: 12 }}>
              <ActionIcon
                name="phone-line"
                onPress={() => {
                  Linking.openURL(`tel:${sp?.sp_officeNumber}`);
                }}
              />
              <ActionIcon
                name="chat-1-line"
                onPress={() => {
                  let url =
                    "whatsapp://send?text=" +
                    "Hello" +
                    "&phone=+977" +
                    sp?.sp_officeNumber;
                  Linking.openURL(url)
                    .then((data) => {
                      console.log("WhatsApp Opened");
                    })
                    .catch(() => {
                      alert("Make sure Whatsapp installed on your device");
                    });
                }}
              />

              <ActionIcon
                name="map-pin-line"
                onPress={() => navigation.navigate("UpdateSP", { sp: sp })}
              />
              {bookIcon == "true" ? (
                <ActionIcon
                  name="bookmark-2-fill"
                  color={Colors.primary}
                  onPress={async () => {
                    const deleteBm = await axiosInstance.post("/bm/delete", {
                      GIVEN_API_KEY: "AXCF",
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
                      GIVEN_API_KEY: "AXCF",
                      user_id: user,
                      sp_id: sp?.sp_contact,
                    });
                    setBookIcon("true");

                    setBookmarked(postBm.data);
                  }}
                />
              )}
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
                {sp?.sp_street + " " + sp?.sp_city}
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
                Joined on 2073-04-01
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
          <View style={{ marginTop: 24 }}>
            <ImageSliderComponent data={sp?.sp_media?.photo} />
          </View>
          {user != sp.sp_contact ? (
            <Pressable
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
              }}
              onPress={() => popup.current.show()}
            >
              <Text style={{ fontSize: 40, fontFamily: "Bold" }}>
                {sp.sp_rating ? sp.sp_rating : 0}
                <Text style={{ fontSize: 20, fontFamily: "Regular" }}>/5</Text>
              </Text>
              <View>
                <StarRating
                  starSize={40}
                  onChange={() => null}
                  rating={sp.sp_rating ? sp.sp_rating : 0}
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
                2000 Reviews
              </Text>
              <View style={{ marginTop: 24 }}>
                <Button label="Rate Us" onPress={() => popup.current.show()} />
              </View>
            </Pressable>
          ) : null}
          {sp.sp_contact != isitsp?.sp_contact && showReviews && (
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
                  >
                    View All
                  </Text>
                )}
              </View>
              <View>
                {reviews !== [] && reviews ? (
                  reviews?.map((item, index) => {
                    console.log(item);
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
            <FlatList
              style={{ marginBottom: 32 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={subCategories}
              renderItem={({ item, index }) => {
                let isEnd = index === subCategories.length - 1;
                return (
                  <CategoryCard
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
          </View>
          {/* Footer */}
          <View
            style={{
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
              source={require("../assets/logo.png")}
              style={{ width: 130 }}
              resizeMode="cover"
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
                  9847000000
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
                  Butwal 3 Golpark
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
                  onservic@gmail.com
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
                console.log(value);
                let res = axiosInstance
                  .post("/sp/updateSettings", {
                    GIVEN_API_KEY: "AXCF",
                    sp_status: spStatus,
                    sp_contact: sp?.sp_contact,
                    sp_showReview: value,
                  })
                  .then(() => setShowReviews(value));
                console.log(res.data);
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
                console.log(value);
                let res = axiosInstance
                  .post("/sp/updateSettings", {
                    GIVEN_API_KEY: "AXCF",
                    sp_status: value ? "ACTIVE" : "INACTIVE",
                    sp_contact: sp.sp_contact,
                    sp_showReview: showReviews,
                  })
                  .then(() => setSpStatus(value));
                console.log(res.data);
              }}
              value={spStatus}
            />
          </View>
          <View
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
          </View>
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
              if (review.length < 4) {
                setReviewError("Minimum 4 charachets is rewuired");
              } else if (review.split(" ").length > 50) {
                setReviewError("Max no of word is 50");
              } else {
                console.log("no error");
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
