import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Colors } from "../styles/main";
export default function SignUpScreen() {
  return (
    <ScrollView>
      <View style={{ flex: 1, margin: 30, flexDirection: "column" }}>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text
            style={{
              textAlignVertical: "center",
              flex: 5,

              fontFamily: "Urbanist",
              fontStyle: "normal",
              fontWeight: "800",
              fontSize: 32,
              lineHeight: 38,
              display: "flex",
              alignItems: "flex-end",
              letterspacing: -0.02,
            }}
          >
            Register
          </Text>

          <View
            style={{
              right: 0,
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Image
              style={{
                marginTop: 10,
                width: 50,
                height: 50,
              }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/qqlret7skn-I155%3A2151%3B22%3A106?alt=media&token=505e72a8-f261-4f38-81e1-bfae6f037c3e",
              }}
            />
            <Text style={{ marginTop: 10 }}>Choose</Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              marginTop: 40,
            }}
          >
            <Text>FullName *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: Colors.primary,
                borderRadius: 4,
                height: 50,
              }}
              placeholder="Full Name"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Email Address *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: Colors.primary,
                borderRadius: 4,
                height: 50,
              }}
              placeholder="Full Name"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Phone Number *</Text>
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
              placeholder="Phone Number"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>City *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: Colors.primary,
                borderRadius: 4,
                height: 50,
              }}
              placeholder="City"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Street *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: Colors.primary,
                borderRadius: 4,
                height: 50,
              }}
              placeholder="Full Name"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>Gender *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: Colors.primary,
                borderRadius: 4,
                height: 50,
              }}
              placeholder="Full Name"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 12,
            }}
          >
            <Text>FullName *</Text>
            <TextInput
              style={{
                width: "100%",
                marginTop: 8,
                borderWidth: 1,
                padding: 16,
                borderColor: Colors.primary,
                borderRadius: 4,
                height: 50,
              }}
              placeholder="Full Name"
            />
            <Text style={{ color: "red" }}>This field Is required</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
