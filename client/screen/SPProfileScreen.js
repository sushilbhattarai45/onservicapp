import React, { useState, createRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import StarRating from "react-native-star-rating-widget";

import Header from "../component/Header";
import Icon from "../component/Icon";
import ImageSliderComponent from "../component/imageSlider";
import { Colors } from "../styles/main";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import CategoryCard from "../component/categoryCard";
import Button from "../component/buttonComponent";
import ModalPopup from "../component/Modal";

import {G, LinearGradient, } from 'react-native-svg'
const Persons = [
  {
    name: "Sushil Bhattarai",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Golpark",
    number: "9742993345",

    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },
  {
    name: "Sushil Bhattarai",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Golpark",
    number: "9742993345",

    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },
  {
    name: "Sushil Bhattarai",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Golpark",
    number: "9742993345",

    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },

  {
    name: "RamKumar",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Butwal",
    number: "9742993345",
    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },

  {
    name: "RamKumar",
    works: "Ac Repair, Carpenter, Network Repair, Electrician",
    address: "Butwal",
    number: "9742993345",
    img: "https://thumbs.dreamstime.com/b/profile-picture-smiling-caucasian-male-employee-close-up-young-businessman-show-leadership-qualities-headshot-portrait-happy-204044575.jpg",
  },
  //  {"name":"Air Conditioner","img":"https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png"},
];

const ReviewsCard = ({ name, image, date, rating, review }) => {
  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: Colors.white,
        marginBottom: 1,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-start" }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 12 }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
            headers: {
              Accept: "*/*",
            },
          }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{ fontSize: 14, color: Colors.black, fontFamily: "Regular" }}
          >
            Tilganga Acharya
          </Text>
          <Text
            style={{ fontSize: 12, color: Colors.black, fontFamily: "Regular" }}
          >
            1 day ago
          </Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <StarRating
            starSize={12}
            onChange={() => null}
            rating={rating}
            color={Colors.gold}
            starStyle={{ marginLeft: -5 }}
            animationConfig={{
              scale: 1,
              duration: 0,
              delay: 0,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: Colors.black,
          fontFamily: "Regular",
          marginTop: 8,
        }}
      >
        Hedfjkshafjhaesjkf
      </Text>
    </View>
  );
};

const ActionIcon = ({ name, onPress }) => {
  return (
    <View style={styles.actionIcon}>
      <Icon {...{ name }} {...{ onPress }} size={24} color={Colors.gray900} />
    </View>
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
const SPProfileScreen = () => {
  const [rating, setRating] = useState(3.5);
  const popup = createRef();
  const popupQr = createRef();
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
              <ActionIcon name="phone-line" />
              <ActionIcon name="chat-1-line" />
              <ActionIcon name="map-pin-line" />
              <ActionIcon name="bookmark-2-line" />
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
            Shakuntala Pandey{" "}
            <Icon
              name="checkbox-circle-fill"
              color="#2A65FD"
              size={16}
              style={{ marginLeft: 8 }}
            />
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
                Butwal 3 Golpark
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
            <SkillPill name="Air Conditioner Repair" />
            <SkillPill name="Telivision Repair" />
            <SkillPill name="Car Renting" />
            <SkillPill name="Carpenter" />
            <SkillPill name="Plumber" />
            <SkillPill name="Air Conditioner Repair" />
            <SkillPill name="Carpenter" />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              ante at eros sagittis tristique sed vitae tortor. Quisque sagittis
              augue at metus ornare, et semper risus ornare. Suspendisse
              imperdiet lacus vel sollicitudin volutpat. Etiam fringilla urna
              libero, sed ultricies ex feugiat eu. Curabitur eu aliquam lorem.
              Nulla facilisi. Pellentesque feugiat rutrum lacus posuere laoreet.
              Etiam a elit quam. Morbi metus ligula, fringilla in sapien quis,
              varius posuere purus.
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
              {rating}
              <Text style={{ fontSize: 20, fontFamily: "Regular" }}>/5</Text>
            </Text>
            <View>
              <StarRating
                starSize={40}
                onChange={() => null}
                rating={rating}
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
            data={Persons}
            renderItem={({ item, index }) => {
              return <ReviewsCard />;
            }}
            keyExtractor={(item, index) => index.toString()}
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
              data={Persons}
              renderItem={({ item, index }) => {
                let isEnd = index === Persons.length - 1;
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
        </View>
      </View>
      <ModalPopup
        ref={popupQr}
        animationType="fade"
        onTouchOutside={() => popupQr.current.close()}
      >
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <Text style={{ fontSize: 28, fontFamily: "Black", marginBottom: 16 }}>
            Share Your Profile
          </Text>
          <Image
            style={{ height: 200, width: 200, marginBottom: 8 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
              headers: {
                Accept: "*/*",
              },
            }}
          />
          <Text
            style={{ fontFamily: "Black", color: Colors.primary, fontSize: 20 }}
          >
            Onservic
          </Text>
          <Text style={{ fontFamily: "Black", fontSize: 20 }}>
            Shakuntala Pandey
          </Text>
          <Text style={{fontFamily:'Regular', color:Colors.gray900, fontSize:16,}}>977-98000000</Text>
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
            maxLength={4}
            multiline={true}
            numberOfLines={4}
            keyboardType={"numeric"}
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
          />
        </View>
         {/* {errorpin ? <Text style={{ color: "red" }}>{errorpin}</Text> : null}  */}
        <View style={{ width: "100%", marginTop: 40 }}>
          <Button label="Share Review" />
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
