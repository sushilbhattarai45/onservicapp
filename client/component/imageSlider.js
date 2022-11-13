import React, { createRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import { Colors } from "../styles/main";
import ModalPopup from "./Modal";

export default function ImageSliderComponent({ style, data }) {
  let mappedData = data?.map((image) => ({ img: image }));
  const [open, setOpen] = useState(false);
  const popup = createRef();
  return (
    <>
      <ImageSlider
        preview={false}
        data={mappedData}
        autoPlay={true}
        closeIconColor="#fff"
        timer={5000}
        caroselImageContainerStyle={{ ...style }}
        indicatorContainerStyle={{ bottom: -10 }}
        inActiveIndicatorStyle={{ opacity: 0.5 }}
        activeIndicatorStyle={{ backgroundColor: Colors.primary, opacity: 0.9 }}
        caroselImageStyle={{ resizeMode: "cover", height: 250 }}
        onClick={(item) => {
          console.log(item);
          setOpen(item.img);
          popup.current.show();
        }}
      />
      <ModalPopup
        ref={popup}
        animationType="fade"
        containerStyle={{
          alignItems: "center",
          width: Dimensions.get("window").width,
          backgroundColor: "#000000AA",
          padding: 0,
        }}
        onPressContainer={() => {
          setOpen(false);
          popup.current.close();
        }}
        onTouchOutside={() => {
          setOpen(false);
          popup.current.close();
        }}
      >
        <Image
          source={{ uri: open }}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </ModalPopup>
    </>
  );
}
