import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";

import { StyleSheet, View, TextInput } from "react-native";
class App extends Component {
  state = {
    text: "http://facebook.github.io/react-native/",
    ok: "ok",
    num: 9877,
  };
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.state.text}
          color="yellow"
          backgroundColor="black"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});

export default App;
