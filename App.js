import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login/LoginScreen';
import HomeScreen from './screen/Home/HomeScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Salary from './screen/Salary/Salary';


export default function App() {

  const Stack = createNativeStackNavigator();



  useEffect(() => {
    // checkDeviceForHardware();
    // checkForFingerprints();
  }, [])

  // const checkDeviceForHardware = async () => {
  //   let compatible = await LocalAuthentication.hasHardwareAsync();
  //   isCompatible(compatible);
  // }

  // const checkForFingerprints = async () => {
  //   let fingerprints = await LocalAuthentication.isEnrolledAsync();
  //   setFingerPrints(fingerprints);
  // };



  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Salary" component={Salary} />

          <Stack.Screen name="Home" component={HomeScreen} />





        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

