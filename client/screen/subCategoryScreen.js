import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import SubCategory from "../component/subCategory";
export default function SubCategoryScreen() {
  const subcategory = [
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },
    {
      name: "Air Conditioner",
      img: "https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png",
    },
    {
      name: "Telivision",
      img: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ow7hdxo6drl-215%3A259?alt=media&token=f8186c30-dea2-4ae5-94e1-f57e487d486e",
    },

    {
      name: "Air Conditioner",
      img: "https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png",
    },
    //  {"name":"Air Conditioner","img":"https://mobileimages.lowes.com/marketingimages/067f9576-6565-4cf8-b171-37bb42f5bec9/room-air-conditioners.png"},
    ,
  ];

  return (
    <View>
      {subcategory.map((subcategory) => {
        return <SubCategory name={subcategory.name} image={subcategory.img} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  
});
