import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login/LoginScreen';
import { useSelector } from 'react-redux';
import MainTab from './screen/MainTab/MainTab';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screen/Drawer/Drawer';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import {
  setCustomText,
} from 'react-native-global-props';
import SoTayLaoDong from './screen/soTayLaoDong/SoTayLaoDong';
import LoginFingerPrint from './screen/LoginFinger/LoginFingerPrint';
import LoginRoot from './screen/RootStackScreen/LoginRoot';

// import AppLoading from 'expo-app-loading';


export default function App() {
  // let [fontsLoaded] = useFonts({

  // });
  // console.log(fontsLoaded);



  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'MondaBold': require('./assets/fonts/Monda-Bold.ttf'),
        'Monda': require('./assets/fonts/Monda-Regular.ttf'),
      });
      await setCustomText({
        style: {
          fontFamily: 'Monda'
          // fontSize: 60,
          // color: 'black'
        }
      });
    };
    loadFonts();
  }, [])

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const { isLoggedIn } = useSelector(state => state.UserReducer);

  // let [fontsLoaded] = useFonts({
  //   'Sansita': require('./assets/fonts/Sansita.ttf'),
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

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
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar hidden />
        {isLoggedIn ?
          <Drawer.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }} drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Sotaylaodong" component={SoTayLaoDong} />

          </Drawer.Navigator> :
          <LoginRoot />}
      </NavigationContainer>
    </PaperProvider>
  );
}
