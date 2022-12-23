import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";
import { Alert } from "react-native";
const AppContext = createContext({});
import { API_KEY } from "@env";
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isitsp, setIsitSp] = useState(null);

  const [userData, setUserData] = useState({});
  const [logged, setLogged] = useState("false");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [ads, setAds] = useState({});
  const [location, setLocation] = useState(null);
  const [snearyou, setSNearYou] = useState(null);
  const [livedistrict, setLiveDistrict] = useState("");
  const [livedcity, setLiveCty] = useState("");

  const [lpermission, setLpermission] = useState("false");
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLpermission("false");
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        setLpermission("true");

        setCoords({
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        });
        text = location?.coords?.latitude;
        let url =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          location?.coords?.longitude +
          "," +
          location?.coords?.latitude +
          ".json?country=np&limit=1&access_token=pk.eyJ1Ijoib25zZXJ2aWMwMSIsImEiOiJjbGFjbGYycGIwYmljM3ZtaXFkbGFjZTcxIn0.sRocgrMGOjXS98-r7t1G_g";

        let res = await axios.get(url);
        if (res) {
          let district = res?.data?.features[0].context[1].text;
          setLiveDistrict(district);

          let city = res?.data?.features[0].context[0].text;
          setLiveCty(city);

          const cat = await axiosInstance.post("/sp/filteredsubcat", {
            GIVEN_API_KEY: API_KEY,
            city: livedcity,
            district: livedistrict,
          });

          setSNearYou(cat?.data?.subcat);
          console.log("ok");
          console.log(snearyou);
        }
      }
    }
    const getUserData = async (contact) => {
      let res = await axiosInstance.post("/user/getOneUser", {
        GIVEN_API_KEY: API_KEY,
        user_contact: contact,
      });
      if (!res.error) {
        setUserData(res.data.data);
      } else {
        console.error(res.error);
      }
    };

    const getAds = async () => {
      let res = await axiosInstance.post("/ads/getAds", {
        GIVEN_API_KEY: API_KEY,
      });
      if (!res.error) {
        setAds(res.data);
      }
    };
    const getUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem("user_contact");

        if (loggedUser) {
          let res = await axiosInstance.post("/user/getOneUser", {
            GIVEN_API_KEY: API_KEY,
            user_contact: loggedUser,
          });
          const status = res?.data.data.user_status;
          if (status != "ACTIVE") {
            await AsyncStorage.removeItem("user_contact");
            setUser(null);
            setLogged("false");
            setUserData(null);
            setIsitSp(null);

            Alert.alert(
              "Account Not Active",
              "Your account is " +
                res?.data.data.user_status +
                ". Please contact at our office",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
          } else {
            setLogged("true");
            setUser(loggedUser);
            getUserData(loggedUser);
            isSp(loggedUser);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    async function isSp(d) {
      try {
        if (d) {
          const spcheck = await axiosInstance.post("/sp/getOneSp", {
            GIVEN_API_KEY: API_KEY,
            sp_contact: d,
          });
          if (spcheck?.data?.statuscode == 201) {
            setIsitSp(spcheck.data.data);
          } else {
            setIsitSp(false);
          }
        }
      } catch (e) {
        console.log(error);
      }
    }
    const getCategories = () => {
      try {
        axiosInstance
          .post("/categories/getvalidcategories", { GIVEN_API_KEY: API_KEY })
          .then((res) => {
            if (!res.error) setCategories(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (e) {
        console.log(error);
      }
    };
    const getSubCategories = () => {
      try {
        axiosInstance
          .post("/subcategories/getmixedsubcategory", {
            GIVEN_API_KEY: API_KEY,
          })
          .then((res) => {
            setSubCategories(res.data.data);
          });
      } catch (e) {
        console.log(error);
      }
    };

    getUser();
    getLocation();
    getCategories();
    getSubCategories();
    getAds();
  }, []);

  return (
    <AppContext.Provider
      value={{
        snearyou,
        lpermission,
        setLpermission,
        setSNearYou,
        logged,
        coords,
        livedistrict,
        setLiveDistrict,
        setCoords,
        setLiveCty,
        livedcity,
        setUser,
        setLogged,
        user,
        isitsp,
        setIsitSp,
        categories,
        subCategories,
        setUserData,
        userData,
        ads,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
