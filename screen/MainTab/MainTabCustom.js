import React, { useEffect, useState } from "react";
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
import { Easing } from "react-native-reanimated";
import Icon, { Icons } from "../../components/Icon/Icon";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
const Tab = createBottomTabNavigator();

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
const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({
                0: { scale: 0.5, rotate: "0deg" },
                1: { scale: 1.5, rotate: "360deg" },
            });
        } else {
            viewRef.current.animate({
                0: { scale: 1.5, rotate: "360deg" },
                1: { scale: 1, rotate: "0deg" },
            });
        }
    }, [focused]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={500}
                style={styles.container}>
                <Icon
                    type={item.type}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    color={focused ? "#0D4A85" : "gray"}
                    size={20}
                />
            </Animatable.View>
            <Text
                style={{
                    fontSize: focused ? 12 : 10,
                    color: focused ? "#0D4A85" : "gray",
                }}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};
const MainTab = ({ route, navigation }) => {
    const { lang } = useSelector((state) => state.UserReducer);
    const TabArr = [
        {
            route: "HomeM",
            name: multilang[lang].trangChu,
            type: Icons.Ionicons,
            activeIcon: "home",
            inActiveIcon: "home-outline",
            component: HomeStackScreen,
            options: { headerShown: false },

            // options: ({ route }) => ({
            //     headerShown: false,
            //     tabBarLabel: multilang[lang].trangChu,
            //     tabBarStyle: ((route) => {
            //         const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            //         if (routeName == "Notify" || routeName == "NotifyContent") {
            //             return { display: "none" };
            //         }
            //         return {
            //             borderTopLeftRadius: 10,
            //             borderTopRightRadius: 10,
            //             paddingBottom: 3,
            //             paddingTop: 5,
            //         };
            //     })(route),
            // }),
        },
        {
            route: "Salary",
            name: multilang[lang].luong,
            type: Icons.Ionicons,
            activeIcon: "wallet-sharp",
            inActiveIcon: "wallet-outline",
            component: Salary,
            options: optionsHeader(multilang[lang].luong),
        },
        {
            route: "Contact",
            name: multilang[lang].lienHe,
            type: Icons.Ionicons,
            activeIcon: "easel",
            inActiveIcon: "easel-outline",
            component: Contact,
            options: optionsHeader(multilang[lang].lienHe),
        },
        {
            route: "Setting",
            name: multilang[lang].caiDat,
            type: Icons.FontAwesome,
            activeIcon: "user-circle",
            inActiveIcon: "user-circle-o",
            component: Setting,
            options: optionsHeader(multilang[lang].caiDat),
        },
    ];

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
            })}>
            {TabArr.map((item, index) => {
                item.options.tabBarButton = (props) => (
                    <TabButton {...props} item={item} />
                );
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={item.options}
                        // options={{
                        //     tabBarButton: (props) => (
                        //         <TabButton {...props} item={item} />
                        //     ),
                        // }}
                    />
                );
            })}
        </Tab.Navigator>
    );
};
export default MainTab;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
