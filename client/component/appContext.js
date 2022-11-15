import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isitsp, setIsitSp] = useState(null);

  const [userData, setUserData] = useState({});
  const [logged, setLogged] = useState("false");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [ads, setAds] = useState({});
  const [location, setLocation] = useState(null);
  const [snearyou, setSNearYou] = useState();
  const [livedistrict, setLiveDistrict] = useState("");
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
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
          ".json?country=np&limit=1&types=district&access_token=pk.eyJ1Ijoib25zZXJ2aWMwMSIsImEiOiJjbGFjbGYycGIwYmljM3ZtaXFkbGFjZTcxIn0.sRocgrMGOjXS98-r7t1G_g";

        let res = await axios.get(url);
        if (res) {
          let district = res?.data?.features[0].text;
          console.log(district);
          setLiveDistrict(district);

          const cat = await axiosInstance.post("/sp/filteredsubcat", {
            GIVEN_API_KEY: "AXCF",
            city: district,
          });

          setSNearYou(cat?.data?.subcat);
        }
        console.log(url);
      }
    }
    const getUserData = async (contact) => {
      let res = await axiosInstance.post("/user/getOneUser", {
        GIVEN_API_KEY: "AXCF",
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
        GIVEN_API_KEY: "AXCF",
      });
      if (!res.error) {
        setAds(res.data);
        console.log(res.data);
      }
    };
    const getUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem("user_contact");
        if (loggedUser) {
          setLogged("true");
          setUser(loggedUser);
          getUserData(loggedUser);
          isSp(loggedUser);
        } else {
          setLogged("false");
        }
      } catch (e) {
        console.log(e);
      }
    };
    async function isSp(d) {
      try {
        if (d) {
          const spcheck = await axiosInstance.post("/sp/getOneSp", {
            GIVEN_API_KEY: "AXCF",
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
          .post("/categories", { GIVEN_API_KEY: "AXCF" })
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
          .post("/subcategories/getmixedsubcategory", { GIVEN_API_KEY: "AXCF" })
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
        setSNearYou,
        logged,
        coords,
        livedistrict,
        setLiveDistrict,
        setCoords,
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
