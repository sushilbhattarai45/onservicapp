import { React, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Pressable,
  ImageBackground,
  FlatList,
} from "react-native";
import { Colors } from "../styles/main";
import PeopleNearYou from "../component/peopleNearYou";
export default function People() {
  const Persons = [
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
  return (
    <View>
      <FlatList
        //   style={styles.videos_flatList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={Persons}
        renderItem={({ item }) => (
          <PeopleNearYou
            name={item.name}
            number={item.number}
            image={item.img}
            works={item.works}
          />
        )}
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
  );
}
