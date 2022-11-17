import axios from "axios";
import { URL } from "@env";
import React, { useContext } from "react";
import AppContext from "./appContext";
import * as Location from "expo-location";
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
export const uploadImage = async (files) => {
  try {
    if (files === null) {
      setError({
        target: "image",
        message: "Sorry ,There is some error with the profile picture!!",
      });
      return null;
    }
    let finalData = [];
    finalData = await Promise.all(
      files.map(async (item) => {
        const data = new FormData();
        console.log(item);
        data.append(
          "profile",
          {
            uri: item,
            name: item,
            type: "image/jpg",
          },
          "myfile"
        );

        const response = await axiosInstance("/user/uploadImage", {
          method: "post",
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response?.data);
        let url = response?.data?.fileName;
        if (url.includes("\\")) {
          const filname = url.split("\\");
          const finalname =
            BASE_OUR_API_URL + "/" + filname[0] + "/" + filname[1];
          return finalname;
        } else {
          const finalname = BASE_OUR_API_URL + "/" + url;

          return finalname;
        }
      })
    );
    console.log(finalData);
    return finalData;
  } catch (e) {
    console.log(e);
    // alert(e);
  }
};
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// export const BASE_OUR_API_URL = "http://172.104.188.69:3001";
export const BASE_OUR_API_URL = "http://192.168.100.11:3001";

export const axiosInstance = axios.create({
  baseURL: BASE_OUR_API_URL + "/v1/api/",
  // baseURL: "http://192.168.100.11:3001/v1/api/",
  // baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

// export const getLocation = async () => {
//   // const {
//   //   livedistrict,
//   //   coords,
//   //   setCoords,
//   //   setLiveDistrict,
//   //   lpermission,
//   //   setLpermission,
//   // } = useContext(AppContext);

//   const { status, canAskAgain } =
//     await Location.requestForegroundPermissionsAsync();
//   console.log("ok");
//   console.log("ok");
//   console.log("ok");
//   console.log("ok");
//   console.log(status);
//   alert(canAskAgain);

//   if (status !== "granted") {
//     setLpermission("false");
//     setErrorMsg("Permission to access location was denied");
//     return;
//   } else {
//     console.log(status);
//   }

//   let location = await Location.getCurrentPositionAsync({});

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     setLpermission("true");
//     alert("Please restart the app");
//     setCoords({
//       latitude: location?.coords?.latitude,
//       longitude: location?.coords?.longitude,
//     });
//     text = location?.coords?.latitude;
//     let url =
//       "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//       location?.coords?.longitude +
//       "," +
//       location?.coords?.latitude +
//       ".json?country=np&limit=1&types=district&access_token=pk.eyJ1Ijoib25zZXJ2aWMwMSIsImEiOiJjbGFjbGYycGIwYmljM3ZtaXFkbGFjZTcxIn0.sRocgrMGOjXS98-r7t1G_g";

//     let res = await axios.get(url);
//     if (res) {
//       let district = res?.data?.features[0].text;
//       console.log(district);
//       setLiveDistrict(district);

//       const cat = await axiosInstance.post("/sp/filteredsubcat", {
//         GIVEN_API_KEY: "AXCF",
//         city: district,
//       });

//       setSNearYou(cat?.data?.subcat);
//     }
//     console.log(url);
//   }
// };
