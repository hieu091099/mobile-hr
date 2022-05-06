import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderHomeScreen from "../../components/HeaderHomeScreen/HeaderHomeScreen";
import HomeScreen from "../Home/HomeScreen";
import OnLeave from "../OnLeave/OnLeave";
import Salary from "../Salary/Salary";
import IconAnt from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import SoTayLaoDong from "../SoTayLaoDong/SoTayLaoDong";

// calendar

const Stack = createNativeStackNavigator();
const HomeStackScreen = () => {
    const dispatch = useDispatch();
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    // headerShown: false,
                    header: () => <HeaderHomeScreen />,
                }}
            />

            <Stack.Screen
                name="OnLeave"
                component={OnLeave}
                options={{
                    headerRight: () => {
                        return (
                            <IconAnt
                                name="calendar"
                                size={30}
                                onPress={() => {
                                    dispatch({
                                        type: "SET_SHOW_YEAR_PICKER",
                                    });
                                }}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="Book"
                component={SoTayLaoDong}
            />
            {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
};

export default HomeStackScreen;
