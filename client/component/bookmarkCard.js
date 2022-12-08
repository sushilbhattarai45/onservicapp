import React, { useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { axiosInstance } from "./tools";
import Icon from "../component/Icon";
import { Colors } from "../styles/main";
import AppContext from "./appContext";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "@env";
export default function BookMarkCard({
  name,
  image,
  rating,
  ratingcount,
  address,
  id,
}) {
  const navigation = useNavigation();
  const { user } = useContext(AppContext);
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
          <TouchableOpacity
            style={{
              height: 90,
              width: 50,
            }}
          >
            <Icon
              onPress={async () => {
                const deleteBm = await axiosInstance.post("/bm/delete", {
                  GIVEN_API_KEY: API_KEY,
                  user_id: user,
                  sp_id: id,
                });
                if (deleteBm?.data.statuscode == 201) {
                  alert("Deleted Successfully");
                  navigation.navigate("Home");
                }
              }}
              style={{
                alignSelf: "center",
              }}
              name="bookmark-2-fill"
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "white",
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
