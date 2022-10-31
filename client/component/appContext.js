import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./tools";

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
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
    getCategories();
    getSubCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        categories,
        subCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
