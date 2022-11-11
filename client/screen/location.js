import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getDistrictName() {
      let res = await axios.get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/83.43114718786677,27.928264536816457.json?country=np&limit=1&types=district&access_token=pk.eyJ1Ijoib25zZXJ2aWMwMSIsImEiOiJjbGFjbGYycGIwYmljM3ZtaXFkbGFjZTcxIn0.sRocgrMGOjXS98-r7t1G_g"
      );
      console.log(JSON.stringify(res?.data.features.id));
      res?.data.features.map((item) => {
        console.log(item.text);
      });
    }
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        setCoords({
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        });
        text = location?.coords?.latitude;
      }
    })();
    getDistrictName();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={styles.paragraph}>
        latitude : {coords.latitude} Longitude :{coords.longitude}{" "}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default LocationScreen;
