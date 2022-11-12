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

import React, { Component, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

class ModalPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      timer: false,
    };
  }
  show = () => this.setState({ visible: true });

  close = () => this.setState({ visible: false });
  render() {
    setTimeout(() => {
      this.setState({ timer: true });
    }, 2000);

    let { onTouchOutside, outsideContainerStyle } = this.props;
    let animationType = this.props.animationType;

    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        animationType={animationType}
        // ref={this.props.ref}
        onRequestClose={this.close}
        style={{ zIndex: 100 }}
      >
        <View style={[styles.outsideContainer, { ...this.props.style }]}>
          {onTouchOutside ? (
            <TouchableWithoutFeedback onPress={onTouchOutside}>
              <View
                style={{ height: "110%", width: "100%", position: "absolute" }}
              />
            </TouchableWithoutFeedback>
          ) : (
            <></>
          )}
          <View style={[styles.modal, this.props.containerStyle]}>
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
    flex: 1,
    backgroundColor: "#00000033",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "85%",
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
});

export default ModalPopup;
