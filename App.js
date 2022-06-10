import React, { useState, useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken, setToken } from "./config";
// import OnLeave from "./screen/OnLeave/OnLeave"
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";
import AppScreen from "./AppScreen";
import { store } from "./redux/store";
import { ToastAndroid } from "react-native";

export default function App() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
        if (!state.isConnected) {
            ToastAndroid.show(
                "Mạng yếu vui lòng thử lại !",
                ToastAndroid.SHORT,
            );
        }
    });

    return (
        <Provider store={store}>
            <AppScreen />
        </Provider>
    );
}
