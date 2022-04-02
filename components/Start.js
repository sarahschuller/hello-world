import React from "react";

// Import react native components
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

// Importing the background image from the assets folder
import BackgroundImage from "../assets/background-image.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.colors.pink,
    };
  }

  // function to update the state with user selected chat screen color
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: "#090C08",
    medgray: "#474056",
    ltgray: "#8A95A5",
    olive: "#B9C6AE",
  };

  render() {
    return (
      // Components to create the color arrays, titles and the chat colors
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>Hello World!</Text>
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>
                {" "}
                Choose background color:{" "}
              </Text>
            </View>

            {/* Available chat screen colors for user to select from */}
            <View style={styles.colorArray}>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="black background"
                accessibilityHint="Change chat background to black"
                accessibilityRole="button"
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.black)}
              ></TouchableOpacity>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="medium gray background"
                accessibilityHint="Change chat background to medium gray"
                accessibilityRole="button"
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.medgray)}
              ></TouchableOpacity>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="light gray background"
                accessibilityHint="Change chat background to light gray"
                accessibilityRole="button"
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.ltgray)}
              ></TouchableOpacity>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="olive green blackground"
                accessibilityHint="Change chat background to olive green"
                accessibilityRole="button"
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.olive)}
              ></TouchableOpacity>

            </View>

            {/* Pressing button takes user to the chat page */}
            <Pressable
              accessible={true}
              accessibilityLabel="Go to the chat page"
              accessibilityHint="Allows you to go to the chat page"
              accessibilityRole="button"
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Create stylesheet for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "50%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  box1: {
    backgroundColor: "white",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },

  colorBox: {
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },

  colorArray: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  color1: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color2: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color3: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color4: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  button: {
    width: "88%",
    height: 70,
    borderRadius: 3,
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});