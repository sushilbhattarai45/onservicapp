import React, { useState } from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import Icon from "./Icon";
import { Colors } from "../styles/main";

export default function Search({
  containerStyle,
  inputStyle,
  rightIcon,
  onChangeText,
  onRightIconPress,
  ...props
}) {
  const [active, setActive] = useState(false);
  return (
    <View style={[styles.Search, { ...containerStyle }]}>
      <Icon
        name="search-2-line"
        size={20}
        color={active ? Colors.black : Colors.gray900}
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={active ? "" : "Search by Services & Location"}
        onChangeText={onChangeText}
        {...props}
      />
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={20}
          color={Colors.gray900}
          onPress={onRightIconPress}
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
    backgroundColor: Colors.white,
    paddingVertical: 12,
    width: "100%",
  },
  searchIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Regular",
    color: Colors.black,
    // width: "100%",
    // backgroundColor:'blue'
  },
});
