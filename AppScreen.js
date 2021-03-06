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
import NetInfo from "@react-native-community/netinfo";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/vi";
import "moment/locale/en-gb";
import { Text, View, SafeAreaView } from "react-native";
import { Easing } from "react-native-reanimated";
export default function App() {
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch();
    const { isLoggedIn, lang } = useSelector((state) => state.UserReducer);
    const { internetStatus } = useSelector(
        (state) => state.NotificationReducer,
    );

    const [isInternet, setIsInternet] = useState(true);
    const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected != isInternet) {
            setIsInternet(state.isConnected);
            // dispatch({
            //     type: "CHANGE_STATUS_INTERNET",
            //     isConnect: state.isConnected,
            // });
        }
    });
    useEffect(() => {
        switch (lang) {
            case "vi":
                moment.locale("vi");
                break;
            case "en":
                moment.locale("en-gb");
                break;
            case "tw":
                moment.locale("zh-cn");
                break;
            default:
                moment.locale("vi");
                break;
        }
    }, [lang]);
    useEffect(() => {
        getToken("lang").then((val) => {
            if (val != undefined) {
                dispatch({
                    type: "CHANGE_LANG",
                    lang: val,
                });
                setToken("lang", val);
            }
        });
    }, []);
    const theme = {
        ...DefaultTheme,
        dark: false,
        roundness: 2,
        mode: "exact",
        colors: {
            ...DefaultTheme.colors,
            primary: "#0D4A85",
            accent: "#f1c40f",
        },
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!isInternet && (
                <View
                    style={{
                        width: "100%",
                        height: 30,
                        // position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#B00020",
                    }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                        {multilang[lang].khongCoKetNoiMang}
                    </Text>
                </View>
            )}
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar hidden />
                    {isLoggedIn ? (
                        <>
                            <Drawer.Navigator
                                screenOptions={{
                                    animation: "slide_from_right",
                                    gestureEnabled: true,
                                    gestureDirection: "horizontal",
                                    transitionSpec: {
                                        open: {
                                            animation: "timing",
                                            duration: 300,
                                            easing: Easing,
                                        },
                                        close: {
                                            animation: "timing",
                                            duration: 300,
                                            easing: Easing,
                                        },
                                    },
                                    // cardStyleInterpolator:
                                    //     cardStyleInterpolator.forHorizontalIOS,
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
                                        headerTitle:
                                            multilang[lang].thayDoiNgonNgu,
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
                                        headerTitle: multilang[lang].taiKhoan,
                                        unmountOnBlur: true,
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
                            {/* <WithoutBotTabRoot /> */}
                        </>
                    ) : (
                        <LoginRoot />
                    )}
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaView>
    );
}
