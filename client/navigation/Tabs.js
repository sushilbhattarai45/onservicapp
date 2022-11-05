import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../component/Icon";
import BookMarkScreen from "../screen/bookmarkScreen";
import HomeScreen from "../screen/homeScreen";
import SearchPersonListingScreen from "../screen/searchPersonListingScreen";
import UserProfileScreen from "../screen/userProfileScreen";
import { Colors } from "../styles/main";
import AppContext from "../component/appContext";
const Tab = createBottomTabNavigator();
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../screen/Auth/loginsScreen";
export default function MyTabs() {
  const { logged } = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-6-fill" : "home-line";
          } else if (route.name === "Search") {
            iconName = "search-line";
          } else if (route.name === "Bookmarks") {
            iconName = focused ? "bookmark-2-fill" : "bookmark-2-line";
          } else if (route.name === "Profile") {
            iconName = focused ? "user-fill" : "user-line";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray900,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Search"
        component={SearchPersonListingScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Bookmarks"
        component={logged ? BookMarkScreen : LoginScreen}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={logged ? UserProfileScreen : LoginScreen}
      />
    </Tab.Navigator>
  );
}
