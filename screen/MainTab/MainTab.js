
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import Salary from '../Salary/Salary';
import { Icon } from 'react-native-elements';
import { Text, View } from 'react-native';
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
    return <Tab.Navigator screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
    }} tabBarOptions={{ showLabel: false }} screenListeners={{
        state: (e) => {
            // Do something with the state
            console.log('state changed', e.data.state.index);
        },
    }}>
        <Tab.Screen name="Home" component={HomeScreen}
            options={{
                tabBarIcon: () => (
                    <Icon name="home" type='feather' color="#0D4A85" size={26} />
                ),
            }} />
        <Tab.Screen name="Salary" component={Salary} options={{
            tabBarIcon: () => (
                <Icon name="money" type='font-awesome' color="#0D4A85" size={26} />
            ),
        }} />
        <Tab.Screen name="Contact" component={Contact} options={{
            tabBarIcon: () => (
                <Icon name="contacts" type='ant-design' color="#0D4A85" size={26} />
            ),
        }} /><Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: () => (
                <Icon name="user" type='ant-design' color="#0D4A85" size={26} />
            ),
        }} />
    </Tab.Navigator>
}
export default MainTab;