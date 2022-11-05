import React, { useState, createRef, useEffect, useContext } from "react";
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
  const { subCategories } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [bookmarked, setBookmarked] = useState();
  const popup = createRef();
  const popupQr = createRef();

  const postReview = async (user_contact, rating, review, sp_contact) => {
    console.log(rating);
    let res = await axiosInstance.post("/review/post", {
      GIVEN_API_KEY: "AXCF",
      user_contact: user_contact,
      sp_contact: sp_contact,
      review_bio: review,
      review_stars: rating,
    });
  };
  useEffect(() => {
    const checkBookmarked = async () => {
      let res = await axiosInstance.post("/bm/check", {
        user_contact: "999999999",
        sp_contact: sp.sp_contact,
        GIVEN_API_KEY: "AXCF",
      });
      if (!res.error) {
        setBookmarked(res.data.data);
        console.log("Bookmarked:" + res.data.data);
      }
    };

    const getReviews = async () => {
      let res = await axiosInstance.post("/review/getSpreview", {
        sp_contact: "12345678",
        GIVEN_API_KEY: "AXCF",
      });
      setReviews(res.data.data);
    };
    checkBookmarked();
    getReviews();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Header
          style={{ position: "absolute", zIndex: 10, paddingHorizontal: 24 }}
          icon="arrow-left-line"
          right={
            <Icon
              name="qr-code-line"
              size={24}
              style={styles.icon}
              color={Colors.white}
              onPress={() => popupQr.current.show()}
            />
          }
          color={Colors.white}
        />

        <ImageSliderComponent />
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
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
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
                  Linking.openURL(`tel:${sp.sp_officeNumber}`);
                }}
              />
              <ActionIcon
                name="chat-1-line"
                onPress={() => {
                  let url =
                    "whatsapp://send?text=" + "Hello" + "&phone=+9779742993345";
                  Linking.openURL(url)
                    .then((data) => {
                      console.log("WhatsApp Opened");
                    })
                    .catch(() => {
                      alert("Make sure Whatsapp installed on your device");
                    });
                }}
              />
              <ActionIcon name="map-pin-line" />
              <ActionIcon
                color={bookmarked ? Colors.primary : Colors.gray900}
                name={bookmarked ? "bookmark-2-fill" : "bookmark-2-line"}
                onPress={async () => {
                  console.log("hi");
                  let url = bookmarked ? "/bm/delete" : "/bm/post";
                  let res = await axiosInstance.post(url, {
                    user_id: "999999999",
                    sp_id: sp.sp_contact,
                    GIVEN_API_KEY: "AXCF",
                  });
                  console.log(res.data);
                }}
              />
            </View>
          </View>
          {/* Name */}
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
            {sp.sp_name}{" "}
            {sp.sp_sp_verified && (
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
                {sp.sp_street + " " + sp.sp_city}
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
            {sp.sp_skills.map((name) => (
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
              {sp.sp_bio}
            </Text>
          </>
          {/* Slider */}
          <View style={{ marginTop: 24 }}>
            <ImageSliderComponent />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 32,
            }}
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
          </View>
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
          </View>
          <FlatList
            style={{}}
            showsHorizontalScrollIndicator={false}
            data={reviews.splice(0, 5)}
            renderItem={({ item, index }) => {
              return (
                <ReviewCard
                  rating={item.review_stars}
                  name={item.user_name}
                  review={item.review_bio}
                  doc={item.review_doc}
                />
              );
            }}
            keyExtractor={(item, index) => item._id}
          />
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
              value={sp.sp_contact}
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
              {sp.sp_name}
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
              {sp.sp_officeNumber ? sp.sp_officeNumber : sp.sp_contact}
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
              if (review.length > 0) {
                console.log("no error");
                setReviewError(false);
                postReview("123456789", rating, review, sp.sp_contact);
                setReview("");
                setRating(0);
                popup.current.close();
              } else if (review.split(" ").length > 50) {
                console.log(" error 1");

                setReviewError("Max no of word is 50");
              } else {
                setReviewError("Minimum 4 charachets is rewuired");
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
    marginTop: -65,
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
});

export default SPProfileScreen;
