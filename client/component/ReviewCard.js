import React from "react";
import { Image, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { Colors } from "../styles/main";
import moment from "moment";

export default ReviewCard = ({ name, image, date, rating, review, doc }) => {
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
            uri: image,
            headers: {
              Accept: "*/*",
            },
          }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{ fontSize: 14, color: Colors.black, fontFamily: "Regular" }}
          >
            {name}
          </Text>
          <Text
            style={{ fontSize: 12, color: Colors.black, fontFamily: "Regular" }}
          >
            {doc.date + " " + doc.time}
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
        {review}
      </Text>
    </View>
  );
};
