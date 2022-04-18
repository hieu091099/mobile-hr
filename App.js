import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import MainTab from "./screen/MainTab/MainTab";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./screen/Drawer/Drawer";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import LoginRoot from "./screen/RootStackScreen/LoginRoot";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnLeave from "./screen/OnLeave/OnLeave";

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        MondaBold: require("./assets/fonts/Monda-Bold.ttf"),
        Monda: require("./assets/fonts/Monda-Regular.ttf"),
      });
      await setCustomText({
        style: {
          fontFamily: "Monda",
        },
      });
    };
    loadFonts();
  }, []);

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const { isLoggedIn } = useSelector((state) => state.UserReducer);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0D4A85",
      accent: "#f1c40f",
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar hidden />
          {isLoggedIn ? (
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="MainTab" component={MainTab} />
        <Drawer.Screen name="OnLeave" component={OnLeave} />
              
            </Drawer.Navigator>
          ) : (
            <LoginRoot />
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
