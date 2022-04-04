
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import Salary from '../Salary/Salary';
import { Icon } from 'react-native-elements';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    return <Tab.Navigator screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        // tabBarActiveBackgroundColor: '#0D4A85',
        // tabBarActiveTintColor: 'white',
        headerShown: false,
        animation: 'slide_from_right',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'blue',
        },
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // console.log({ focused })
            size = focused ? size + 4 : size;
            if (route.name === 'HomeScreen') {
                iconName = focused
                    ? 'home'
                    : 'home-outline';

            } else if (route.name === 'Salary') {
                iconName = focused ? 'flashlight' : 'flashlight-outline';
            } else if (route.name === 'Contact') {
                iconName = focused ? 'easel' : 'easel-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'earth-sharp' : 'earth-outline';
            }
            return <Ionicons name={iconName} size={size} color="#0D4A85" />;
        }
    })} screenListeners={{
        state: (e) => {
            // Do something with the state
            // console.log('state changed', e.data.state.index);
            dispatch({
                type: 'CHANGE_SCREEN',
                indexScreen: e.data.state.index
            })
            setActive(e.data.state.index);
        },
    }} >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Salary" component={Salary} />
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
}
export default MainTab;
