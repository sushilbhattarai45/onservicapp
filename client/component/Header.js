import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import Constants from "expo-constants";
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width:'100%',
    marginTop: Constants.statusBarHeight + 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  right: {
    marginLeft: "auto",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Bold",
    letterSpacing: -0.4,
    color: "rgba(33,33,33,1)",
  },
});
