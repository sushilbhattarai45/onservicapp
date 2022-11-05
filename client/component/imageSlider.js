import React from "react";
import { View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import { Colors } from "../styles/main";

export default function ImageSliderComponent({ style, data }) {
  let mappedData = data.map((image) => ({ img: image }));
  console.log(mappedData);
  return (
    <ImageSlider
      preview={false}
      data={mappedData}
      autoPlay={true}
      closeIconColor="#fff"
      timer={5000}
      indicatorContainerStyle={{ bottom: -10 }}
      inActiveIndicatorStyle={{ opacity: 0.5 }}
      activeIndicatorStyle={{ backgroundColor: Colors.primary, opacity: 0.9 }}
      caroselImageStyle={{ resizeMode: "cover", height: 250 }}
    />
  );
}
