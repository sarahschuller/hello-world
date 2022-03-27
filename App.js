import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>How are you?</Text>
      <Text>I'm feeling blue!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  red: {
    color: 'red',
    fontWeight: '600',
  },

  bigRed: {
    color: 'red',
    fontSize: 30,
  },

  bigBlueBold: {
    color: 'blue',
    fontSize: 30,
    fontWeight: '600',
  },

});
