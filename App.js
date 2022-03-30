import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getToken } from './config';
import MainTab from './screen/MainTab/MainTab';



export default function App() {

  const Stack = createNativeStackNavigator();
  const [userIdFromDevice, setUserIdFromDevice] = useState("");
  useEffect(() => {
    // checkDeviceForHardware();
    // checkForFingerprints();
  }, [])

  getToken('user').then(res => {

    res = res != "" || res != undefined ? JSON.parse(res) : '';
    setUserIdFromDevice(res.userId)



  })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }} >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={MainTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

