import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notify from "../Notify/Notify";
import NotifyContent from "../NotifyContent/NotifyContent";
import { multilang } from "../../language/multilang";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

export default function WithoutBotTabRoot() {
    const { lang } = useSelector((state) => state.UserReducer);
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
            }}>
            <Stack.Screen
                name="Setting"
                component={Notify}
                options={{
                    headerTitle: multilang[lang].thongBao,
                }}
            />
            <Stack.Screen
                name="UserDetail"
                component={NotifyContent}
                options={{
                    headerTitle: "Nội dung thông báo",
                }}
            />
        </Stack.Navigator>
    );
}
