import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isitsp, setIsitSp] = useState(null);

  const [userData, setUserData] = useState({});
  const [logged, setLogged] = useState("false");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
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
          console.log(spcheck.data);
          if (spcheck?.data?.statuscode == 201) {
            setIsitSp(spcheck.data.data);
          } else {
            console.log("No");
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
          .post("/subcategories/getallsubcategory", { GIVEN_API_KEY: "AXCF" })
          .then((res) => {
            setSubCategories(res.data.data);
          });
      } catch (e) {
        console.log(error);
      }
    };
    getUser();
    getCategories();
    getSubCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        logged,
        setUser,
        setLogged,
        user,
        isitsp,
        setIsitSp,
        categories,
        subCategories,
        setUserData,
        userData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
