import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import Constants from "expo-constants";
<<<<<<< HEAD
import Icon from "./Icon";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Header({
  headerText,
  onPressIcon,
  icon,
  right,
  color,
   style
}) {
  let textColor = color ? color : Colors.black ;
  return (
    <View style={{...styles.header, ...style}}>
      <Icon name={icon} onPress={onPressIcon} size={24} style={styles.icon} color={textColor} />
      <Text style={[styles.headerText, { color: textColor }]}>
        {headerText}
      </Text>
      <View style={styles.right}>{right}</View>
=======

export default function Header({ headerText, onPressIcon, icon }) {
  return (
    <View style={styles.header}>
      <Image
        style={styles.icon}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ag65kgjdi0n-184%3A1078?alt=media&token=643549ba-f04f-47ae-b002-4d48e255f978",
        }}
      />
      <Text style={styles.headerText}>{headerText}</Text>
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
<<<<<<< HEAD
    width:'100%',
    marginTop: Constants.statusBarHeight + 16,
=======
    top: Constants.statusBarHeight,
>>>>>>> 4308fd9f68645d969915174f63ad2bd83f760444
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  right: {
    marginLeft:'auto',
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Bold",
    letterSpacing: -0.4,
    color: "rgba(33,33,33,1)",
  },
});
