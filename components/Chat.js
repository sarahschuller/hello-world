import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

// Import GiftedChat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Import firebase/firestore
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Import AsyncStorage
import { AsyncStorage } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyDFOHNAcSgeXNibwIAF__NcFCqRNV4jY0Y",
  authDomain: "chat-app-7c061.firebaseapp.com",
  projectId: "chat-app-7c061",
  storageBucket: "chat-app-7c061.appspot.com",
  messagingSenderId: "788217019301",
  appId: "1:788217019301:web:5393e211b4bedf3d85464c",
  measurementId: "G-ZMQBKQJ99W"
};

export default class Chat extends React.Component {

  constructor(){
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
    };

    // initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // reference firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;
  }

  // check for collection updates and set state with current data
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
					_id: data.user._id,
					name: data.user.name,
					avatar: data.user.avatar,
				},
      });
    });
    this.setState({
      messages:messages,
    });
  }
    
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    // Set the page title once Chat is loaded
    let { name } = this.props.route.params
    // Adds the name to top of screen
    this.props.navigation.setOptions({ title: name })

    // load messages from async storage
    this.getMessages();

    // listens for collection updates
    this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
            _id: user.uid,
            name: name,
            avatar: 'https://placeimg.com/140/140/any',
          },
        });
      });
    }

    componentWillUnmount() {
        // stop listening to authentication
        this.authUnsubscribe();
        // stop listening for changes
        this.unsubscribe();
      }
    
    // add messages to collection/chat
    addMessages() {
      const message = this.state.messages[0];
      this.referenceChatMessages.add({
        _id: message._id,
        text: message.text || "",
        createdAt: message.createdAt,
        user: this.state.user,
        image: message.image || "",
        location: message.location || null,
      });
    }

    // when a message is sent, append in GiftedChat and add to collection
    onSend(messages = []) {
      this.setState(
        (previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
          this.addMessages();
        }
      );
    }

    // function called when messages collection is updated
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // check each of the documents for data
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar,
          },
          image: data.image || null,
          location: data.location || null,
        });
      });
      this.setState({
        messages: messages,
      });
    };

// function to change color of chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#757083'
          },
          left: {
            backgroundColor: '#e2e5e9'
          }
        }}
      />
    )
  }

  render() {
    //Updates name on chat screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    //changes bgcolor on chat screen
    const { bgColor } = this.props.route.params;

    return (
      // Outerview to enclose GiftedChat
      <View style={{flex: 1,
      backgroundColor: bgColor
      }}>

        {/* Gifted Chat Render */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
          }}
        />

        {/* Fixes Keyboard Avoiding View for Android devices */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}

      </View>
    );
  }
}