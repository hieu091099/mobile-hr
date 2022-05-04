import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Home/HomeScreen";
import { Constants } from "expo";
import Salary from "../Salary/Salary";
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import HomeStackScreen from "../RootStackScreen/HomeRoot";
const Tab = createBottomTabNavigator();

const Contact = () => {
    const PdfReader = ({ url: uri }) => (
        <WebView
            javaScriptEnabled={true}
            style={{ flex: 1 }}
            source={{ uri }}
        />
    );
    const source = {
        uri: "http://192.168.0.96/modules/ME/pph/LSA/LSA_Uploads/B96304.pdf",
        cache: true,
    };
    const _handlePress = () => {};
    return (
        <View
            style={{
                flex: 1,
                height: "100%",
                width: "100%",
                backgroundColor: "#ecf0f1",
            }}>
            <TouchableOpacity
                onPress={() =>
                    Linking.openURL(
                        "http://192.168.0.96/webview/lyv/sotaylaodong.html",
                    )
                }>
                <Text>leuleu</Text>
            </TouchableOpacity>
        </View>
    );
};
const Profile = () => {
    const navigation = useNavigation();
    return <View></View>;
};
export const optionsHeader = {
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
                    // padding: 6,
                    // // backgroundColor: '#F5F5F5',
                    // borderRadius: 10,r
                    // borderColor: '#EEEEEE',
                    // borderWidth: 1
                }}>
                <Ionicons name="arrow-back" size={30} />
            </TouchableOpacity>
        );
    },
    headerRight: () => {
        return (
            <TouchableOpacity
                onPress={() => alert("Co gi dau ma click, qua ngu ngok haiz!")}
                style={{
                    marginRight: 20,
                    padding: 6,
                    // backgroundColor: '#F5F5F5',
                    borderRadius: 10,
                    borderColor: "#EEEEEE",
                    borderWidth: 1,
                }}>
                <Ionicons name="person-circle" size={30} />
            </TouchableOpacity>
        );
    },
    headerTitleAlign: "center",
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
                    if (route.name === "HomeScreen") {
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
                    // console.log(e.data.state)
                },
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeStackScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Salary"
                component={Salary}
                options={optionsHeader}
            />
            <Tab.Screen
                name="Contact"
                component={Contact}
                options={optionsHeader}
            />
            <Tab.Screen
                name="Setting"
                component={Profile}
                options={optionsHeader}
            />
        </Tab.Navigator>
    );
};
export default MainTab;
