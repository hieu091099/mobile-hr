import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconAnt from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Setting from "../Setting/Setting";
import UserDetail from "../Setting/UserDetail";
// calendar

const Stack = createNativeStackNavigator();

const SettingStackScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}>

            <Stack.Screen
                name="Setting"
                component={Setting}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="UserDetail"
                component={UserDetail}
                options={{
                    headerTitle:"Tài khoản"
                }}
            />
 {/*
            <Stack.Screen
                name="OnLeave"
                component={OnLeave}
                options={{
                    headerTitle:"Ngày nghỉ"
                }}
            />
                <Stack.Screen
                name="OverTime"
                component={OverTime}
                options={{
                    headerTitle:"Tăng ca"
                }}
            />
            <Stack.Screen
                name="Book"
                component={SoTayLaoDong}
                options={{
                    headerTitle:"Sổ tay lao động"
                }}
            /> */}
            {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
};

export default SettingStackScreen;
