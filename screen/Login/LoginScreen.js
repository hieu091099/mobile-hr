import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/UserAction';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../config';

export default function LoginScreen() {
    const [compatible, isCompatible] = useState(false);
    const [fingerPrints, setFingerPrints] = useState(false);
    const [userIdFromDevice, setUserIdFromDevice] = useState("");
    const { user, isLoggedIn } = useSelector(state => state.UserReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    getToken('user').then(res => {
        res = JSON.parse(res);
        setUserIdFromDevice(res.userId)

    })
    // console.log({ userId });

    // const [loaded] = useFonts({
    //     Montserrat: require('../../assets/fonts/Sansita.ttf'),
    // });
    useEffect(() => {
        checkDeviceForHardware();
        checkForFingerprints();
    }, [])

    const checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        isCompatible(compatible);
    }

    const checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        setFingerPrints(fingerprints);
    };

    const scanFingerprint = async () => {
        await LocalAuthentication.authenticateAsync().then(res => {
            if (res.success) {
                dispatch({
                    type: 'LOGIN_FINGER'
                })
                navigation.navigate('Home');
                // console.log('okokok');

            }
        })
    };
    const [userLogin, setUserLogin] = useState({
        userId: "",
        password: ""
    });
    const login = () => {
        let action = loginAction(userLogin, navigation);
        if (userIdFromDevice != '') {
            action = loginAction({ userId: userIdFromDevice, password: userLogin.password }, navigation)
        }
        dispatch(action);
    }
    return (
        <ImageBackground source={require('../../assets/images/bg_login2.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
            <View style={styles.tieude}>
                <Text style={[styles.td]}>Chào mừng !</Text>
                <Text style={[styles.td]}>{userIdFromDevice ? userIdFromDevice : 'Bạn'} đã trở lại</Text>
            </View>
            <View style={styles.form}>
                {userIdFromDevice == '' && <TextInput placeholder='Mã nhân viên' style={styles.inputlogin} onChangeText={(val) => { setUserLogin({ ...userLogin, "userId": val }); }} />}
                <TextInput secureTextEntry={true} placeholder='Mật khẩu' style={[styles.inputlogin, { marginTop: 20 }]} onChangeText={(val) => {
                    setUserLogin({ ...userLogin, "password": val });
                }} />
                <TouchableOpacity style={styles.btndn} onPress={() => login()}><Text style={styles.textbtndn}>Login</Text></TouchableOpacity>
            </View>

            {userIdFromDevice != '' && compatible && fingerPrints && <View style={[styles.form, { marginTop: 30, justifyContent: 'center', alignItems: 'center' }]}><Ionicons name='finger-print-outline' size={50} color='#0D4A85' onPress={() => {
                scanFingerprint();
            }} /></View>}
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    td: {
        color: '#2D5881',
        fontSize: 35,
    },
    tieude: {
        width: '100%',
        paddingHorizontal: 20,
        height: 200,
        justifyContent: 'flex-end'
    }, form: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 50
    }, inputlogin: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRightWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#0D4A85',
        // borderRadius: 12,
        // paddingHorizontal: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 6,
    }, btndn: {
        marginTop: 30,
        width: '100%',
        height: 55,
        backgroundColor: '#0D4A85',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }, textbtndn: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
});


