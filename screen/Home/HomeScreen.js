import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../config';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(state => state.UserReducer);
    const navigation = useNavigation();
    console.log(isLoggedIn);
    useEffect(() => {
        if (!isLoggedIn) {
            navigation.navigate('Login');
        }
    }, [isLoggedIn])
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
        })
    }
    getToken('user').then((res) => {
        res = JSON.parse(res);
        console.log({ res });
    })
    return (
        <View>
            <Text>Hello {user.userId} </Text>
            <Button
                onPress={() => logout()}
                title="Logout"
                color="#841584"
            />
        </View>
    )


}