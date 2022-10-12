import React from "react";
import { View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import { Colors } from "../styles/main";

export default function ImageSliderComponent({ style }) {
  return (
    <ImageSlider
      preview={false}
      data={[
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
        },
        {
          img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        },
        {
          img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
        },
      ]}
      autoPlay={true}
      onItemChanged={(item) => console.log("item", item)}
      closeIconColor="#fff"
      timer={5000}
      activeIndicatorStyle={{ backgroundColor: Colors.white }}
      caroselImageStyle={{ resizeMode: "cover", height: 250 }}
    />
  );
}
