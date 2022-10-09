/*
To use this component
import ModalPopup form ./Modal.js

create a ref for this modal

const popup = React.createRef();

params :
ref = {target => popup = target}
onTouchOutside = {function} // what to do after clicking outside

uses:
to show : popup.show
to close : popup.close

*/


import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

class ModalPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  show = () => this.setState({ visible: true });

  close = () => this.setState({ visible: false });
  render() {
    let show = this.state;
    let { onTouchOutside } = this.props;
    let animationType = this.props.animationType;
    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        onRequestClose={this.close}
        animationType={animationType}
        style={{ ...styles.modal, backgroundColor: "#0000" }}
      >
        <View style={[styles.outsideContainer, { ...this.props.style }]}>
          {onTouchOutside ? (
            <TouchableWithoutFeedback onPress={onTouchOutside}>
              <View style={{ height: "110%", width: "100%", position:"absolute", }} />
            </TouchableWithoutFeedback>
          ) : (
            <></>
          )}
          <View style={styles.modal}>
            {/* <Text>Hello</Text> */}
            {this.props.children}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  outsideContainer: {
    flex:1, 
    backgroundColor: "#000000AA",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "80%",
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius:8,
  },
});

export default ModalPopup;
