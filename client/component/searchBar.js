import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import Icon from "./Icon";
import { Colors } from "../styles/main";

export default function Search({
  containerStyle,
  inputStyle,
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={[styles.Search, { ...containerStyle }]}>
      <Icon name="search-2-line" size={20} color={Colors.gray500} style={styles.searchIcon} />
      <TextInput
        style={[styles.input, { ...inputStyle }]}
        placeholder="Search for services"
      />
      {rightIcon && (
        <Icon name={rightIcon} size={20} color={Colors.gray500} />
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
    marginRight:12
  },
  rightIcon: {
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
