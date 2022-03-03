import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function App() {
  const [text, setText] = React.useState({
    email: "",
    password: ""
  });
  console.log(text)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput
        style={{ backgroundColor: 'white' }}
        label="Email"
        value={text.email}
        onChangeText={(value) => {
          console.log(value);
        }}
      />
      <TextInput
        style={{ backgroundColor: 'white' }}
        label="Password"
        value={text.password}
        onChangeText={(value) => {
          console.log(value);
        }}
      />
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
});
