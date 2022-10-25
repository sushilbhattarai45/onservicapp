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

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={MyTabs} />

      <Stack.Screen name="Signup" component={SignUpScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="ForgotPin" component={ForgetPinScreen} />
      <Stack.Screen name="CreateNewPin" component={CreateNewPinScreen} />
      <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
      <Stack.Screen name="BecomeSP" component={BecomeSPScreen} />
      <Stack.Screen
        name="CategoryPersonListing"
        component={CategoryPersonListingScreen}
      />
      <Stack.Screen name="SPProfile" component={SPProfileScreen} />
    </Stack.Navigator>
  );
}
