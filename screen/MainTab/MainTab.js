
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import Salary from '../Salary/Salary';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderHomeScreen from '../../components/HeaderHomeScreen/HeaderHomeScreen';
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
const optionsHeader = {
    headerStyle: { height: 65, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    headerLeft: () => {
        return <TouchableOpacity
            onPress={() => alert('Co gi dau ma click, qua ngu ngok haiz!')}
            style={{
                marginLeft: 20,
                // padding: 6,
                // backgroundColor: '#F5F5F5',
                // borderRadius: 10
            }}>
            <Ionicons name='chevron-back-outline' size={30} />
        </TouchableOpacity>
    },
    headerRight: () => {
        return <TouchableOpacity
            onPress={() => alert('Co gi dau ma click, qua ngu ngok haiz!')}
            style={{
                marginRight: 20,
                padding: 6,
                backgroundColor: '#F5F5F5',
                borderRadius: 10
            }}>
            <Ionicons name='person-circle' size={30} />
        </TouchableOpacity>
    },
    headerTitleAlign: 'center'
}
const MainTab = () => {
    const [active, setActive] = useState();
    const dispatch = useDispatch();
    return <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        // tabBarLabelStyle: { color: 'black' },
        animation: 'slide_from_right',
        labelStyle: {
            fontSize: 12,
        },
        tabBarStyle: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingBottom: 5,
            paddingTop: 5
        },
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            color = focused ? 'black' : 'gray';
            if (route.name === 'HomeScreen') {
                iconName = focused
                    ? 'home'
                    : 'home-outline';
            } else if (route.name === 'Salary') {
                iconName = focused ? 'wallet-sharp' : 'wallet-outline';
            } else if (route.name === 'Contact') {
                iconName = focused ? 'easel' : 'easel-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'earth-sharp' : 'earth-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
        }
    })} screenListeners={{
        state: (e) => {
            // console.log(e.data.state)
            // setActive(e.data.state.index);
        },
    }} >
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarLabel: 'Home', header: () => (<HeaderHomeScreen />) }} />
        <Tab.Screen name="Salary" component={Salary} options={optionsHeader} />
        <Tab.Screen name="Contact" component={Contact} options={optionsHeader} />
        <Tab.Screen name="Profile" component={Profile} options={optionsHeader} />
    </Tab.Navigator>
}
export default MainTab;
