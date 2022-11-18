import { React, useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
    Linking,

  Alert,
  Pressable,
} from "react-native";
import BookMarkCard from "../component/bookmarkCard";
import Header from "../component/Header";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../styles/main";
import axios from "axios";
import AppContext from "../component/appContext";

import { axiosInstance } from "../component/tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function BookMarkScreen({ navigation }) {
  const { ads } = useContext(AppContext);
  const [adlink, setAdLink] = useState("www.Onservic.com")
    const [adsource,setAdSource]=useState("https://www.w3schools.com/css/img_lights.jpg")

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async() => {
      getBm();
   await  getads()
      // if (ads!=null)
      // {
      //  

      //   }
      return navigation;
      //Put your Data loading function here instead of my loadData()
    }, [navigation]);
   async function getads()
    { if (ads) {
       setAdLink(ads?.bookmarkimage[0].ads_link)
          setAdSource(ads?.bookmarkimage[0].ads_mediaLink)

      }

    }

    async function getBm() {
      const num = await AsyncStorage.getItem("user_contact");
      const data = await axiosInstance.post("bm/get", {
        GIVEN_API_KEY: "AXCF",
        user_id: num,
      });
      if (data.data.statuscode == 201) {
        const finaldata = data.data.data;
        setBmPersons(finaldata);
        setBookmarked(true);
      } else {
        console.log(data.data.message);
        setBookmarked(false);
      }
    }
  }, []);
  const [num, setNum] = useState("");
  const [boomarked, setBookmarked] = useState(false);
  const [BmPersons, setBmPersons] = useState();

  return (
    <ScrollView style={{ backgroundColor: Colors.gray200 }}>
      <View
        style={{
          marginTop: Constants.statusBarHeight + 20,
        }}
      >
        <View>
          <Text
            style={{
              paddingHorizontal: 24,
              fontFamily: "Regular",
              fontSize: 24,
              fontWeight: "800",
            }}
          >
            Bookmarks
          </Text>
          <Pressable onPress={() =>
 Linking.openURL("https://" + adlink) 
          }
            style={{
              marginTop: 20,
              width: "100%",
              height: 200,
              // backgroundColor: "red",
            }}
          >
            <Image     
              style={{
                alignSelf: "center",
                alignSelf: "center",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              source={{
                uri: adsource,
                headers: {
                  Accept: "*/*",
                },
              }}
            />
          </Pressable>
          <View
            style={{
              marginTop: 20,
            }}
          >
            {boomarked
              ? BmPersons.map((persons) => {
                  return (
                    <View
                      style={{
                        marginBottom: 2,
                      }}
                    >
                      <TouchableOpacity
                        onPress={async () => {
                          const SpData = await axiosInstance.post(
                            "sp/getOneSp",
                            {
                              GIVEN_API_KEY: "AXCF",
                              sp_contact: persons.sp_contact,
                            }
                          );
                          navigation.navigate("Sp", {
                            sp: SpData?.data.data,
                          });
                        }}
                      >
                        <BookMarkCard
                          id={persons.sp_contact}
                          name={persons.sp_name}
                          image={persons.sp_profileImage}
                          address={persons.sp_district + " " + persons.sp_city}
                          rating={persons.rating}
                          ratingcount={persons.ratingcount}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
              : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ThemeLightComponentSongsCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(249,249,252,1)",
    width: 426,
    height: 77,
  },
  MaskGroup: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 20,
  },
  AutoLayoutVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    width: 318,
  },
  Txt748: {
    fontSize: 18,
    fontFamily: "Regular",
    fontWeight: "400",
    lineHeight: 18,
    color: "rgba(33,33,33,1)",
    width: 319,
  },
});
