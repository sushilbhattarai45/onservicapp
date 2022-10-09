import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import Icon from 'react-native-remix-icon';
import { Colors } from "../styles/main";

export default function Search({
  containerStyle,
  inputStyle,
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={[styles.Search, { ...containerStyle }]}>
      {/* <Icon name="search-line" size={18} color={Colors.gray500} /> */}
      <Image
        style={styles.searchIcon}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/etttlbocgw6-114%3A314?alt=media&token=3935a084-a9ce-4db5-b2df-b937ddc67f63",
        }}
      />
      <TextInput
        style={[styles.input, { ...inputStyle }]}
        placeholder="Search for services"
      />
      {rightIcon && (
        <Image
          style={styles.rightIcon}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/etttlbocgw6-114%3A314?alt=media&token=3935a084-a9ce-4db5-b2df-b937ddc67f63",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Search: {
    // marginTop: Constants.statusBarHeight ,
    // flex: 1,
    // display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding:16,
    width:'100%',
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight:12
  },
  rightIcon: {
    width: 18,
    height: 18,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    // height: "100%",
    fontSize: 16,
    fontFamily: "Regular",
    color: "rgba(0,0,0,1)",
    // width: "100%",
    // backgroundColor:'blue'
  },
});
