import { React, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Colors } from "../../styles/main";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function LScreen() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [num, setNum] = useState("");
  const [pin, setPin] = useState("");

  const [focuscolor1, setFocusColor1] = useState(Colors.black);
  const [focuscolor2, setFocusColor2] = useState(Colors.black);
  const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    
    const initialValues = {
  phone: '',
  pin: ''
};
    const LoginSchema = Yup.object().shape({
        phone: Yup.string().required("Please enter your Phone Number").min(10,'To short').max(10,"To Long"),
        pin: Yup.string().required("Pin is required").min(4,'To short').max(4,"To Long")
    })
    
//   async function checkLogin() {
//     if (pin.length != 4 || num.length != 10) {
//       if (pin.length != 4 && num.length != 10) {
//         setError1("Please enter a valid Phone Number");
//         setError2("Please enter a valid OTP");
//         setFocusColor2("red");
//         setFocusColor1("red");
//       } else if (pin.length != 4) {
//         setError2("Please enter a valid OTP");
//         setFocusColor2("red");
//       } else {
//         setError1("Please enter a valid Phone Number");
//         setFocusColor1("red");
//       }
//     } else {
//       const res = await axios.post(
//         "http://192.168.16.104:3001/v1/api/user/login",
//         {
//           'user_num': num,
//           'user_pass': pin,
//         }
//       );
//       const status = res?.data?.statuscode;
      
//       if (status == 200)
//       {
    
//         alert("done")
//         }
  
//       else 
//       {
//         setFocusColor2("red");
//         setFocusColor1("red")
//         setError2("Username Password not matched")
//         }
//     }
//   }
  return (
      <View style={styles.container}>
   <Formik initialValues={initialValues} validationSchema={LoginSchema}
                 onSubmit={(values) => {
alert((value)=>JSON.stringify(value))              }}>
              
                  {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <View>
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
           
                  

                    

                      <View>
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
                                      borderColor: focuscolor1,
                                      borderRadius: 4,
                                      height: 50,
                                  }}
                                                onChangeText={handleChange('phone')}
              onBlur={() => setFieldTouched('phone')}

                                //   onChangeText={(value) => {
                                //       setNum(value);
                                //       setError1("")
                                //       setFocusColor1(Colors.primary);
                                //   }}
                                  placeholder="Phone Number"
                              />

                              {error1 ? (
                                  <Text
                                      style={{
                                          color: "red",
                                      }}
                                  >
                                      {error1}
                                  </Text>
                              ) : null}

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
                                      borderColor: focuscolor2,
                                      borderRadius: 4,
                                      height: 50,
                                  }}
                                //   onChangeText={(value) => {
                                //       setPin(value);
                                //       setFocusColor1(Colors.primary)
                                //       setError2("")
                                //       setFocusColor2(Colors.primary);
                                //   }}
                                                onChangeText={handleChange('pin')}
              onBlur={() => setFieldTouched('pin')}

                                  placeholder="Enter Your Pin"
                              />
                             
                                   {touched.name && errors.pin &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.pin}</Text>
            }    

                          </View>
                      </View>

                 
        {/* {error1 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "red",
            }}
          >
            {error1}
          </Text>
        ) : null} */}
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
            color={toggleCheckBox ? Colors.primary : undefined}
          />
                  <Text style={{ marginLeft: 12 }}>Remember me</Text>
                  

          <Text style={{ position: "absolute", right: 12 }}>Forgot PIN?</Text>
        </View>
        
          </View>

      <View style={{ position: "relative", top: 150 }}>
        <Pressable
                              style={{
                                  borderColor: Colors.primary,
                                  borderWidth: 1,
                                  justifyContent: "center",
                                  height: 50,
                              }}
                              onPress={()=>handleSubmit}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.primary,
              fontFamily: "Urbanist",
              textAlignVertical: "center",
            }}
          >
            Login
          </Text>
        </Pressable>
        
        <Text style={{ marginTop: 8, textAlign: "center" }}>
          Dont Have an account?
          <Text
            style={{
              color: Colors.primary,
            }}
          >
            {" "}
            Register{" "}
          </Text>
        </Text>
              </View>

          
</View>
 )}
                  </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 24,
    display: "flex",
  },
});
