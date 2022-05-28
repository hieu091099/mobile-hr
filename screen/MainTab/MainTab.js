import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Home/HomeScreen";
import Salary from "../Salary/Salary";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderHomeScreen from "../../components/HeaderHomeScreen/HeaderHomeScreen";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import OnLeave from "../OnLeave/OnLeave";
import HomeStackScreen from "../RootStackScreen/HomeRoot";
import Setting from "../Setting/Setting";
import SettingStackScreen from "../RootStackScreen/SettingRoot";
const Tab = createBottomTabNavigator();

const Contact = () => {
    return <></>;
};
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
        // headerRight: () => {
        //     return (
        //         <TouchableOpacity
        //             // onPress={() => alert("Co gi dau ma click, qua ngu ngok haiz!")}
        //             style={{
        //                 marginRight: 20,
        //                 padding: 6,
        //                 // backgroundColor: '#F5F5F5',
        //                 borderRadius: 10,
        //                 borderColor: "#EEEEEE",
        //                 borderWidth: 1,
        //             }}>
        //             <Ionicons name="person-circle" size={30} />
        //         </TouchableOpacity>
        //     );
        // },
        headerTitleAlign: "center",
        headerTitle: title,
        tabBarLabel: title,
    };
};

const MainTab = () => {
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
                    //// console.log(e.data.state)
                },
            }}>
            <Tab.Screen
                name="HomeM"
                component={HomeStackScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Trang Chủ",
                }}
            />
            <Tab.Screen
                name="Salary"
                component={Salary}
                options={optionsHeader("Lương")}
            />
            <Tab.Screen
                name="Contact"
                component={Contact}
                options={optionsHeader("Liên Hệ")}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={optionsHeader("Cài Đặt")}
            />
        </Tab.Navigator>
    );
};
export default MainTab;
