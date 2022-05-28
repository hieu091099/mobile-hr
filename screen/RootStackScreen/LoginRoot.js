import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import LoginScreen from "../Login/LoginScreen";
import LoginFingerPrint from "../LoginFinger/LoginFingerPrint";
import { getToken } from "../../config";
import ChangePasswordCMND from "../ChangePassword/ChangePasswordCMND";

export default function LoginRoot() {
    const Stack = createNativeStackNavigator();
    const [userIdFromDevice, setUserIdFromDevice] = useState("");

    const { checkIsChoose } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        getToken("user").then((res) => {
            if (res != undefined) {
                res = JSON.parse(res);
                setUserIdFromDevice(res.userId);
            } else {
                setUserIdFromDevice("empty");
            }
        });
    }, [checkIsChoose]);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}>
            {userIdFromDevice == "empty" ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginFingerPrint} />
            )}
            <Stack.Screen
                name="ChangePassCMND"
                component={ChangePasswordCMND}
            />
        </Stack.Navigator>
    );
}
