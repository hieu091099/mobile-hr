import { View, Text } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HeaderHomeScreen from "../../components/HeaderHomeScreen/HeaderHomeScreen"
import HomeScreen from "../Home/HomeScreen"
import OnLeave from "../OnLeave/OnLeave"

const Stack = createNativeStackNavigator()
const HomeStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    // headerShown: false,
                    header: () => <HeaderHomeScreen />,
                }}
            />

            <Stack.Screen name="OnLeave" component={OnLeave} />
            {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    )
}

export default HomeStackScreen
