import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [text, setText] = useState({
    email: "",
    password: ""
  });
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <View style={styles.logo}>
        <Image source={require('./screen/image/LAI_logo.png')} />
      </View>
      <TextInput
        style={styles.inputlogin}
        label="Email"
        value={text.email}
        onChangeText={text => setText({ ...text, email: text })}
      />
      <TextInput
        style={styles.inputlogin}
        label="Password"
        value={text.password}
        onChangeText={text => setText({ ...text, password: text })}
      />
      <Button style={styles.inputlogin} icon="login" mode="contained" onPress={() => console.log('Pressed')}>
        Đăng Nhập
      </Button>
      <View style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => {
          console.log('press ');
        }}>
          <Ionicons name="ios-finger-print-outline" size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: '40%',
    display: 'flex',
    justifyContent: 'center'
  },
  inputlogin: {
    marginVertical: 10,
    width: '90%'
  }
});
