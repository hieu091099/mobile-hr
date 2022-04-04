import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login/LoginScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import { getToken } from './config';
import MainTab from './screen/MainTab/MainTab';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screen/Drawer/Drawer';


export default function App() {

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [userIdFromDevice, setUserIdFromDevice] = useState("");
  const { user, isLoggedIn } = useSelector(state => state.UserReducer);
  // console.log({ user });
  useEffect(() => {
    // checkDeviceForHardware();
    // checkForFingerprints();.
    // getToken('user').then(res => {
    //   if (res != undefined) {
    //     res = JSON.parse(res);
    //     setUserIdFromDevice(res.userId)
    //   }
    // })
  }, [isLoggedIn])


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
          </Drawer.Navigator> :
          <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }} >
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>}


      </NavigationContainer>
    </PaperProvider>


  );
}
