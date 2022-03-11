import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login/LoginScreen';

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
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

