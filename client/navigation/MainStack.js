import MyTabs from "./Tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/Auth/loginsScreen";
import SignUpScreen from "../screen/Auth/signUpScreen";
import SubCategoryScreen from "../screen/subCategoryScreen";
import CategoryPersonListingScreen from "../screen/categoryPersonListingScreen";
import OtpScreen from "../screen/Auth/otpScreen";
import CreateNewPinScreen from "../screen/Auth/createNewPinScreen";
import ForgetPinScreen from "../screen/Auth/forgetPinScreen";
import SPProfileScreen from "../screen/SPProfileScreen";
import BecomeSPScreen from "../screen/Auth/becomeSPScreen";
import BookMarkScreen from "../screen/bookmarkScreen";
import CategoryCard from "../component/categoryCard";
import SearchPersonListingScreen from "../screen/searchPersonListingScreen";
import QrScreen from "../screen/Qrscreen.js";
import UpdateSpScreen from "../screen/Auth/updateSPScreen";
import UpdateUser from "../screen/Auth/updateUser";
import LocationScreen from "../screen/location";

const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeTabs" component={MyTabs} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Bookmark" component={BookMarkScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="ForgotPin" component={ForgetPinScreen} />
      <Stack.Screen name="CreateNewPin" component={CreateNewPinScreen} />
      <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
      <Stack.Screen name="BecomeSP" component={BecomeSPScreen} />
      <Stack.Screen name="Sp" component={SPProfileScreen} />
      <Stack.Screen name="CategoryCard" component={CategoryCard} />
      <Stack.Screen name="QrScreen" component={QrScreen} />
      <Stack.Screen name="UpdateSP" component={UpdateSpScreen} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />

      <Stack.Screen
        name="CategoryPersonListing"
        component={CategoryPersonListingScreen}
      />
      <Stack.Screen
        name="SearchPersonListing"
        component={SearchPersonListingScreen}
      />
      <Stack.Screen name="SPProfile" component={SPProfileScreen} />
    </Stack.Navigator>
  );
}
