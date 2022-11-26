import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import Icon from "./Icon";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header({
  headerText,
  onPressIcon,
  icon,
  right,
  color,
  style,
}) {
  let textColor = color ? color : Colors.black;
  return (
    <View style={{ ...styles.header, ...style }}>
      <SafeAreaView>
        <View style={{ ...styles.header }}>
          <Icon
            name={icon}
            onPress={onPressIcon}
            size={24}
            style={styles.icon}
            color={textColor}
          />
          <Text style={[styles.headerText, { color: textColor }]}>
            {headerText}
          </Text>
          <View style={styles.right}>{right}</View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 8,
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
