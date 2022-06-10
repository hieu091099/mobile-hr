import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderHomeScreen from "../../components/HeaderHomeScreen/HeaderHomeScreen";
import HomeScreen from "../Home/HomeScreen";
import SoTayLaoDong from "../SoTayLaoDong/SoTayLaoDong";
import OnLeave from "../OnLeave/OnLeave";
import OverTime from "../OverTime/OverTime";
import Salary from "../Salary/Salary";
import IconAnt from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { multilang } from "../../language/multilang";
import Notify from "../Notify/Notify";
import NotifyContent from "../NotifyContent/NotifyContent";

const Stack = createNativeStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {
    const { lang } = useSelector((state) => state.UserReducer);
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
                    tabBarLabel: multilang[lang].trangChu,
                    // headerShown: false,
                    header: () => <HeaderHomeScreen />,
                }}
            />

            <Stack.Screen
                name="OnLeave"
                component={OnLeave}
                options={{
                    headerTitle: multilang[lang].ngayNghi,
                    tabBarStyle: { display: "none" },
                }}
            />
            <Stack.Screen
                name="OverTime"
                component={OverTime}
                options={{
                    headerTitle: multilang[lang].tangCa,
                }}
            />
            <Stack.Screen
                name="Book"
                component={SoTayLaoDong}
                options={{
                    headerTitle: multilang[lang].soTay,
                }}
            />
            <Stack.Screen
                name="Notify"
                component={Notify}
                options={{
                    headerTitle: multilang[lang].thongBao,
                }}
            />
            <Stack.Screen
                name="NotifyContent"
                component={NotifyContent}
                options={{
                    headerTitle: multilang[lang].thongBao,
                }}
            />
            {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
};

export default HomeStackScreen;
