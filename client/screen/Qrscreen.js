import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Colors } from "../styles/main";
import Header from "../component/Header";

export default function App({ navigation, navigation: { goBack } }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(data);
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Header
        headerText="QR Code"
        onPressIcon={() => goBack()}
        style={{
          paddingHorizontal: 10,
        }}
        icon="arrow-left-line"
      />
      <Text>{hasPermission}</Text>
      <View
        style={{
          marginTop: 5,
          height: "80%",
          width: "100%",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Text
          style={{
            color: "white",
            marginLeft: 15,
          }}
        >
          Please Scan a valid Qr Code of OnServic Pvt Ltd
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
