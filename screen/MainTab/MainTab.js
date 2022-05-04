import React, { useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../Home/HomeScreen"
import Salary from "../Salary/Salary"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import HeaderHomeScreen from "../../components/HeaderHomeScreen/HeaderHomeScreen"
import { useNavigation } from "@react-navigation/native"
import { WebView } from 'react-native-webview';
import OnLeave from "../OnLeave/OnLeave"
import HomeStackScreen from "../RootStackScreen/HomeRoot"
const Tab = createBottomTabNavigator()

const Contact = () => {
    const [visible, setvisible] = useState(true);
    return (
        <View style={{flex:1,position:'relative'}}>
            <Text>Sổ tay lao đsộng</Text>
        <WebView
               onLoadEnd={() => setvisible(false)}
        source={{ uri: 'https://docs.google.com/gview?embedded=true&url=http://b2b.lacty.com.vn/webview/lhg/lhg.pdf' }}
        style={{  width:'100%',height:200}}
      />
     {visible &&  <View style={{width:'100%',height:'100%',position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'#00000021'}}>
      <ActivityIndicator size="large" color="#0D4A85" />
      </View>}
        </View>
    )
}
const Profile = () => {
    const navigation = useNavigation()
    return <Text>123</Text>
}
export const optionsHeader = {
    headerStyle: {
        height: 65,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    headerLeft: () => {
        const navigation = useNavigation()
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
        )
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
        )
    },
    headerTitleAlign: "center",
}

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
                    let iconName
                    color = focused ? "#0D4A85" : "gray"
                    if (route.name === "HomeScreen") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name === "Salary") {
                        iconName = focused ? "wallet-sharp" : "wallet-outline"
                    } else if (route.name === "Contact") {
                        iconName = focused ? "easel" : "easel-outline"
                    } else if (route.name === "Setting") {
                        // iconName = focused ? 'earth-sharp' : 'earth-outline';
                        iconName = focused ? "settings" : "settings-outline"
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    )
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
    )
}
export default MainTab
