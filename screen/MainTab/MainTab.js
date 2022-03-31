
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import Salary from '../Salary/Salary';
import { Icon } from 'react-native-elements';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
// import { Icon } from 'react-native-vector-icons/Icon';
const Tab = createBottomTabNavigator();

const Contact = () => {
    return <View>
        <Text>Contact</Text>
    </View>
}
const Profile = () => {
    return <View>
        <Text>Profile</Text>
    </View>
}
const MainTab = () => {
    const [active, setActive] = useState();
    const dispatch = useDispatch();
    return <Tab.Navigator screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
    }} tabBarOptions={{ showLabel: false }} screenListeners={{
        state: (e) => {
            // Do something with the state
            // console.log('state changed', e.data.state.index);
            dispatch({
                type: 'CHANGE_SCREEN',
                indexScreen: e.data.state.index
            })
            setActive(e.data.state.index);
        },
    }}>
        <Tab.Screen name="HomeScreen" component={HomeScreen}
            options={{
                tabBarIcon: () => (
                    <Icon name="home" type='ant-design' color={active == 0 ? '#0D4A85' : '#ccc'} size={active == 0 ? 30 : 26} />
                ),
            }} />
        <Tab.Screen name="Salary" component={Salary} options={{
            tabBarIcon: () => (
                <Icon name="wallet" type='ant-design' color={active == 1 ? '#0D4A85' : '#ccc'} size={active == 1 ? 30 : 26} />
            ),
        }} />
        <Tab.Screen name="Contact" component={Contact} options={{
            tabBarIcon: () => (
                <Icon name="contacts" type='ant-design' color={active == 2 ? '#0D4A85' : '#ccc'} size={active == 2 ? 30 : 26} />
            ),
        }} /><Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: () => (
                <Icon name="user" type='ant-design' color={active == 3 ? '#0D4A85' : '#ccc'} size={active == 3 ? 30 : 26} />
            ),
        }} />
    </Tab.Navigator>
}
export default MainTab;