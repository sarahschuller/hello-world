import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

// import Gifted Chat library
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(){
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },

        // System Message
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  } 

  // function called when a user sends a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {

    //User desired name appears at top of screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    const { bgColor } = this.props.route.params;

    return (
      <View>
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {/* Android Keyboard Avoiding fix */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    );
  }
}