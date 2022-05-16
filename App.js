import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import MainTab from "./screen/MainTab/MainTab";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./screen/Drawer/Drawer";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import LoginRoot from "./screen/RootStackScreen/LoginRoot";
import { SafeAreaView } from 'react-native-safe-area-context'
import ChangePassword from "./screen/ChangePassword/ChangePassword";
import SuccessChangePass from "./screen/ChangePassword/SuccessChangePass";
import HeaderHomeScreen from "./components/HeaderHomeScreen/HeaderHomeScreen";
import IconAnt from "react-native-vector-icons/AntDesign";
import ChangeLanguage from "./screen/ChangeLanguage/ChangeLanguage";

// import OnLeave from "./screen/OnLeave/OnLeave"

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
       <SafeAreaView style={{flex:1}}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar hidden />
                    {isLoggedIn ? (
                        <>
                            <Drawer.Navigator
                                screenOptions={{
                                    animation: "slide_from_right",
                                    drawerStyle: {
                                        width: "75%",
                                    },
                                }}
                                drawerContent={(props) => (
                                    <DrawerContent {...props} />
                                )}>
                                <Drawer.Screen
                                    name="MainTab"
                                    component={MainTab}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="ChangePassword"
                                    component={ChangePassword}
                                    screenOptions={{ headerShown: true }}
                                    options={{
                                        headerTitle:"Thay đổi mật khẩu",
                                        headerLeft: () => {
                                            const navigation = useNavigation();
                                            return (
                                                <IconAnt
                                                    name="arrowleft"
                                                    size={30}
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    style={{marginLeft:20}}
                                                />
                                            );
                                        },
                                    }}
                                />
                                <Stack.Screen
                                    name="ChangeLanguage"
                                    component={ChangeLanguage}
                                    screenOptions={{ headerShown: true }}
                                    options={{
                                        headerTitle:"Thay đổi ngôn ngữ",
                                        headerLeft: () => {
                                            const navigation = useNavigation();
                                            return (
                                                <IconAnt
                                                    name="arrowleft"
                                                    size={30}
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    style={{marginLeft:20}}
                                                />
                                            );
                                        },
                                    }}
                                />
                                <Stack.Screen
                                    name="SuccessChangePass"
                                    component={SuccessChangePass}
                                    options={{ headerShown: false }}
                                />
                            </Drawer.Navigator>
                        </>
                    ) : (
                        <LoginRoot />
                    )}
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaView>
    );
}
