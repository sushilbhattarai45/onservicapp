import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Icon from "../component/Icon";

export default function BookMarkCard({
  name,
  image,
  rating,
  ratingcount,
  address,
}) {
  return (
    <View style={styles.ThemeLightComponentSongsCard}>
      <Image
        style={styles.MaskGroup}
        source={{
          uri: image,
          headers: {
            Accept: "*/*",
          },
        }}
      />
      <View style={styles.AutoLayoutVertical}>
        <View>
          <Text style={styles.Txt758}>{name}</Text>
          <Text style={styles.works}>
            ★ {rating}
            {ratingcount} · {address} · Technician
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            style={{
              alignSelf: "center",
            }}
            name="bookmark-2-fill"
            size={24}
            color={Colors.primary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ThemeLightComponentSongsCard: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 15,

    backgroundColor: "white",
    padding: 10,
  },
  MaskGroup: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 20,
  },
  AutoLayoutVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "center",

    flex: 1,
  },
  Txt758: {
    fontSize: 16,
    fontFamily: "Regular",
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33,33,33,1)",
    width: 299,
    marginBottom: 10,
  },
  works: {
    fontSize: 12,
    fontFamily: "Regular",
    main: "Txt884",
    seg1: "[object Object]",
    seg2: "[object Object]",
    seg3: "[object Object]",
    seg4: "[object Object]",
    seg5: "[object Object]",
    seg6: "[object Object]",
    seg7: "[object Object]",
  },
});
