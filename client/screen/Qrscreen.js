import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Colors } from "../styles/main";
import Header from "../component/Header";
import { axiosInstance } from "../component/tools";
import Button from "../component/buttonComponent";
import { API_KEY } from "@env";

export default function QrScreen({ navigation, navigation: { goBack } }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      setHasPermission(false);
      getBarCodeScannerPermissions();
      getBarCodeScannerPermissions();
    });
    return unsubscribe;
  }, [navigation]);
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Hello");
    getData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function getData(num) {
    const data = await axiosInstance.post("sp/getOneSp", {
      GIVEN_API_KEY: API_KEY,
      sp_contact: num,
    });
    console.log(data.data.data);
    if (data.data.data != null) {
      navigation.navigate("Sp", {
        sp: data.data.data,
      });
    } else {
      alert(num);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <BarCodeScanner
          onBarCodeScanned={!scanned ? handleBarCodeScanned : () => {}}
          style={{
            width: Dimensions.get("window").width * 1.8,
            height: Dimensions.get("window").height * 1.1,
          }}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          ratio="16:9"
        />
      </View>
      <Header
        headerText="QR Code"
        onPressIcon={() => goBack()}
        style={{
          paddingHorizontal: 10,
          marginTop: 8,
          position: "absolute",
          top: 0,
        }}
        color={Colors.white}
        icon="arrow-left-line"
      />
      {scanned && (
        <View
          style={{
            width: 150,
            marginTop: 24,
            position: "absolute",
            bottom: 24,
          }}
        >
          <Button label={"Scan Again"} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
