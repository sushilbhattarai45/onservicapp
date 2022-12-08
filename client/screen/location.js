import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppContext from "../component/appContext";
import { axiosInstance } from "../component/tools";
import { API_KEY } from "@env";

const LocationScreen = () => {
  const { livedistrict } = useContext(AppContext);

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
export default LocationScreen;
