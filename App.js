import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import MainTab from "./screen/MainTab/MainTab";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./screen/Drawer/Drawer";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import LoginRoot from "./screen/RootStackScreen/LoginRoot";
import { SafeAreaView } from "react-native-safe-area-context";
import ChangePassword from "./screen/ChangePassword/ChangePassword";
import SuccessChangePass from "./screen/ChangePassword/SuccessChangePass";
import HeaderHomeScreen from "./components/HeaderHomeScreen/HeaderHomeScreen";
import IconAnt from "react-native-vector-icons/AntDesign";
import ChangeLanguage from "./screen/ChangeLanguage/ChangeLanguage";
import { getExpoPushNoti, getToken, setToken } from "./config";
// import OnLeave from "./screen/OnLeave/OnLeave"
import * as Notifications from "expo-notifications";
import UserDetail from "./screen/Setting/UserDetail";
import { multilang } from "./language/multilang";

export default function App() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    const dispatch = useDispatch();

    useEffect(async () => {
        getToken("lang").then((val) => {
            if (val != undefined) {
                dispatch({
                    type: "CHANGE_LANG",
                    lang: val,
                });
                setToken("lang", val);
            }
        });
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
    const { isLoggedIn,lang } = useSelector((state) => state.UserReducer);

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
        <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar />
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
                                        headerTitle: multilang[lang].doiMatKhau,
                                        headerLeft: () => {
                                            const navigation = useNavigation();
                                            return (
                                                <IconAnt
                                                    name="arrowleft"
                                                    size={30}
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    style={{ marginLeft: 20 }}
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
                                        headerTitle: multilang[lang].thayDoiNgonNgu,
                                        headerLeft: () => {
                                            const navigation = useNavigation();
                                            return (
                                                <IconAnt
                                                    name="arrowleft"
                                                    size={30}
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    style={{ marginLeft: 20 }}
                                                />
                                            );
                                        },
                                    }}
                                />
                                <Stack.Screen
                                    name="UserDetail"
                                    component={UserDetail}
                                    screenOptions={{ headerShown: true }}
                                    options={{
                                        headerTitle: "Tài khoản",
                                        headerLeft: () => {
                                            const navigation = useNavigation();
                                            return (
                                                <IconAnt
                                                    name="arrowleft"
                                                    size={30}
                                                    onPress={() => {
                                                        navigation.goBack();
                                                    }}
                                                    style={{ marginLeft: 20 }}
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
