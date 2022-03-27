import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>Hello World!</Text>
      <Text style={styles.bigBlue}>How are you?</Text>
      <Text style={[styles.red, styles.bigBlue]}>I'm feeling blue!</Text>
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

  bigBlue: {
    color: 'blue',
    fontSize: 30,
  },

});
