// Imports
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import firebase from "firebase";
import "firebase/firestore";

export default class CustomActions extends React.Component {

    // Select an image from the user device gallery
    pickImage = async () => {
        // permission to access the user device's gallery
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try {
          if (status === "granted") {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            }).catch((error) => {
              console.error(error);
            });
            if (!result.cancelled) {
              const imageUrl = await this.uploadImage(result.uri);
              this.props.onSend({ image: imageUrl });
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

    onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
            options,
        cancelButtonIndex,
        },
        async (buttonIndex) => {
        switch (buttonIndex) {
            case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
            case 1:
            console.log('user wants to take a photo');
            return;
            case 2:
            console.log('user wants to get their location');
            default:
        }
        },
      );
    };

render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// Stylesheet for render
const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
   });

   CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
   };