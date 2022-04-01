import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class HelloWorld extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{width: 60, height: 60, backgroundColor: 'purple'}}></View>
        <View style={styles.box2}></View>
        <View style={styles.box3}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  box1: {
    flex: 1,
    backgroundColor: 'purple'
  },
  box2: {
    flex:1,
    backgroundColor: 'orange'
  },
  box3: {
    flex: 1,
    backgroundColor: 'yellow'
  }
});
