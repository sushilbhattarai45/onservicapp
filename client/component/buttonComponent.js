import { React, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ImageBackground,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Colors } from "../styles/main";
export default function LoginScreen() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ top: "30%" }}>
        <Text
          style={{
            fontFamily: "Urbanist",
            fontStyle: "800",
            fontWeight: "bold",
            fontSize: 32,
            lineHeight: 38,
            display: "flex",
            alignItems: "flex-end",
            letterSpacing: -0.02,

            color: "#212121",
          }}
        >
          LOGIN
        </Text>
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Text>Phone Number</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={10}
            style={{
              width: "100%",
              marginTop: 8,
              borderWidth: 1,
              padding: 16,
              borderColor: Colors.primary,
              borderRadius: 4,
              height: 50,
            }}
            placeholder="Phone NUmber"
          />
        </View>
        <View
          style={{
            marginTop: 12,
          }}
        >
          <Text>Password</Text>
          <TextInput
            maxLength={4}
            keyboardType="numeric"
            style={{
              width: "100%",
              marginTop: 8,
              borderWidth: 1,
              padding: 16,
              borderColor: Colors.primary,
              borderRadius: 4,
              height: 50,
            }}
            placeholder="Enter Your Pin"
          />
        </View>
        <View
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CheckBox
            value={toggleCheckBox}
            onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
            color={toggleCheckBox ? "#4630EB" : undefined}
          />
          <Text style={{ marginLeft: 12 }}>Remember me</Text>
          <Text style={{ position: "absolute", right: 12 }}>Forgot PIN?</Text>
        </View>
      </View>
      <View style={{ position: "relative", top: 200 }}>
        <View
          style={{
            borderColor: Colors.primary,
            borderWidth: 1,

            justifyContent: "center",
            height: 50,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontFamily: "Urbanist",
              textAlignVertical: "center",
            }}
          >
            Login
          </Text>
        </View>
        <Text style={{ marginTop: 8, textAlign: "center" }}>
          Dont Have an account? Register
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 24,
    display: "flex",
  },
});
