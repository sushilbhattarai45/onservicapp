import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AppContext from "../component/appContext";
import { axiosInstance } from "../component/tools";
import { API_KEY } from "@env";

import App from "../App";
const LocationScreen = () => {
  const { livedistrict } = useContext(AppContext);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getDistrictName() {
      const cat = await axiosInstance.post("/sp/filteredsubcat", {
        GIVEN_API_KEY: API_KEY,
        city: livedistrict,
      });

    }
    if (livedistrict != null) {
      getDistrictName();
    }
  }, [livedistrict]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text>{livedistrict}</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default LocationScreen;
