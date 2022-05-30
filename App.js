import React, { useState, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken, setToken } from "./config";
// import OnLeave from "./screen/OnLeave/OnLeave"
import * as Notifications from "expo-notifications";
import AppScreen from "./AppScreen";
import { store } from "./redux/store";
export default function App() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                MondaBold: require("./assets/fonts/Monda-Bold.ttf"),
                Monda: require("./assets/fonts/Monda-Regular.ttf"),
            });
            await setCustomText({
                style: {
                    fontFamily: "Monda",
                },
            });
        };
        loadFonts();
    });

    return (
        <Provider store={store}>
            <AppScreen />
        </Provider>
    );
}
