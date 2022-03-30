import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getToken } from './config';
import MainTab from './screen/MainTab/MainTab';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


export default function App() {

  const Stack = createNativeStackNavigator();
  const [userIdFromDevice, setUserIdFromDevice] = useState("");
  useEffect(() => {
    // checkDeviceForHardware();
    // checkForFingerprints();
  }, [])

  getToken('user').then(res => {

    // res = res != "" || res != undefined ? JSON.parse(res) : '';
    // setUserIdFromDevice(res.userId)
    if (res != undefined) {
      res = JSON.parse(res);
      setUserIdFromDevice(res.userId)
    }
  })
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0D4A85',
      accent: '#f1c40f',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar hidden />
          <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }} >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTab" component={MainTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>

  );
}

