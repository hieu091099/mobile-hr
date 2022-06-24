import React, { useState, useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken, setToken } from "./config";
// import OnLeave from "./screen/OnLeave/OnLeave"
import * as Notifications from "expo-notifications";
import AppScreen from "./AppScreen";
import { store } from "./redux/store";
import { ActivityIndicator, ToastAndroid, View } from "react-native";
import moment from "moment";
import { Text } from "react-native";

export default function App() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    return (
        <Provider store={store}>
            <AppScreen />
        </Provider>
    );
}