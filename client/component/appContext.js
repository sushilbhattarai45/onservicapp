import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./tools";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState("false");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem("user_contact");
        if (loggedUser) {
          setLogged("true");
          setUser(loggedUser);
        } else {
          setLogged("false");
        }
      } catch (e) {
        console.log(error);
      }
    };

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
        categories,
        subCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
