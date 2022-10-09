import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";
import Constants from 'expo-constants';

export default function Search({
  containerStyle,
  inputStyle,
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={[styles.Search, { ...containerStyle }]}>
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
    top: Constants.statusBarHeight ,
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 1)",
    height: 50,
    width:'100%',
  },
  searchIcon: {
    width: 18,
    height: 18,
    padding: 12,
    marginRight:12
  },
  rightIcon: {
    width: 18,
    height: 18,
    padding: 12,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    // height: "100%",
    fontSize: 16,
    fontFamily: "Urbanist, sans-serif",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
    // width: "100%",
    // backgroundColor:'blue'
  },
});
