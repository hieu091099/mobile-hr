import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Home/HomeScreen";
import Salary from "../Salary/Salary";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderHomeScreen from "../../components/HeaderHomeScreen/HeaderHomeScreen";
import {
    getFocusedRouteNameFromRoute,
    useNavigation,
} from "@react-navigation/native";
import { WebView } from "react-native-webview";
import OnLeave from "../OnLeave/OnLeave";
import HomeStackScreen from "../RootStackScreen/HomeRoot";
import Setting from "../Setting/Setting";
import SettingStackScreen from "../RootStackScreen/SettingRoot";
import { multilang } from "../../language/multilang";
import Contact from "../Contact/Contact";

const Tab = createBottomTabNavigator();
// const Setting = () => {
//     const navigation = useNavigation();
//     return <Text>123</Text>;
// };
export const optionsHeader = (title) => {
    return {
        headerStyle: {
            height: 65,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },

        headerLeft: () => {
            const navigation = useNavigation();
            return (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        marginLeft: 20,
                    }}>
                    <Ionicons name="arrow-back" size={30} />
                </TouchableOpacity>
            );
        },
        headerTitleAlign: "center",
        headerTitle: title,
        tabBarLabel: title,
    };
};

const MainTab = ({ route, navigation }) => {
    const { lang } = useSelector((state) => state.UserReducer);
    // navigation.setOptions({
    //     tabBarStyle: { display: "none" },
    // });
    // const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
    // console.log(routeName);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#0D4A85",
                // tabBarLabelStyle: { color: 'black' },
                animation: "slide_from_right",
                labelStyle: {
                    fontSize: 12,
                },
                tabBarStyle: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingBottom: 3,
                    paddingTop: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    color = focused ? "#0D4A85" : "gray";
                    if (route.name === "HomeM") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Salary") {
                        iconName = focused ? "wallet-sharp" : "wallet-outline";
                    } else if (route.name === "Contact") {
                        iconName = focused ? "easel" : "easel-outline";
                    } else if (route.name === "Setting") {
                        // iconName = focused ? 'earth-sharp' : 'earth-outline';
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
            screenListeners={{
                state: (e) => {
                    // console.log("test", e.data.state);
                    let routes = e.data.state.routes;
                    // console.log(routes[0]?.state.index);
                    if (routes[0].state && routes[0].state.index > 0) {
                        navigation.setOptions({
                            tabBarStyle: { display: "none" },
                        });
                    }
                },
            }}>
            <Tab.Screen
                name="HomeM"
                component={HomeStackScreen}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: multilang[lang].trangChu,
                    tabBarStyle: ((route) => {
                        const routeName =
                            getFocusedRouteNameFromRoute(route) ?? "";
                        if (
                            routeName == "Notify" ||
                            routeName == "NotifyContent"
                        ) {
                            return { display: "none" };
                        }
                        return;
                    })(route),
                })}
            />
            <Tab.Screen
                name="Salary"
                component={Salary}
                options={optionsHeader(multilang[lang].luong)}
            />
            <Tab.Screen
                name="Contact"
                component={Contact}
                options={optionsHeader(multilang[lang].lienHe)}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={optionsHeader(multilang[lang].caiDat)}
            />
        </Tab.Navigator>
    );
};
export default MainTab;
