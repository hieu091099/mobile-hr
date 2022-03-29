import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import { PaperSelect } from 'react-native-paper-select';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/UserAction';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../config';
import { Icon } from 'react-native-elements';

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
    const [factory, setFactory] = useState({
        value: '',
        list: [
            { _id: '1', value: 'BLUE' },
            { _id: '2', value: 'RED' },
            { _id: '3', value: 'GREEN' },
            { _id: '4', value: 'YELLOW' },
            { _id: '5', value: 'BROWN' },
            { _id: '6', value: 'BLACK' },
            { _id: '7', value: 'WHITE' },
            { _id: '8', value: 'CYAN' },
        ],
        selectedList: [],
        error: '',
    });
    return (
        <ImageBackground source={require('../../assets/images/bg_login2.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
            <View>
                <Text style={[styles.td, { marginTop: 20 }]}>
                    LYV APP
                </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 10 }}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/logo_login.jpg')}
                />
            </View>
            <View style={styles.tieude}>
                <Text style={[styles.td]}>Xin chào <Text style={{ fontSize: 35 }}>{userIdFromDevice ? userIdFromDevice : 'Bạn'}!</Text></Text>
                <Text style={{ textAlign: 'center', color: 'gray', marginTop: 10 }}>Đăng nhập dưới UserID khác?</Text>
            </View>
            <View style={styles.form}>
                {userIdFromDevice == '' ? <TextInput theme={{ colors: { primary: '#0D4A85', underlineColor: 'transparent' } }} label="USERID" mode='outlined' placeholder='Tài khoản' style={[styles.inputlogin, { marginTop: 20 }]} onChangeText={(val) => {
                    setUserLogin({ ...userLogin, "userId": val });
                }} /> : null}
                <TextInput theme={{ colors: { primary: '#0D4A85', underlineColor: 'transparent' } }} label="PASSWORD" mode='outlined' secureTextEntry={true} placeholder='Mật khẩu' style={[styles.inputlogin, { marginTop: 20 }]} onChangeText={(val) => {
                    setUserLogin({ ...userLogin, "password": val });
                }} />

                {/* <PaperSelect
                    label="Select Gender"
                    value={factory.value}
                    onSelection={(value) => {
                        setFactory({
                            ...factory,
                            value: value.text,
                            selectedList: value.selectedList,
                            error: '',
                        });
                    }}
                    arrayList={[...factory.list]}
                    selectedArrayList={factory.selectedList}
                    errorText={factory.error}
                    multiEnable={false}
                    dialogTitleStyle={{ color: 'red' }}
                    checkboxColor="yellow"
                    checkboxLabelStyle={{ color: 'red', fontWeight: '700' }}
                    textInputBackgroundColor="yellow"
                    textInputColor="red"
                />; */}


                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={userIdFromDevice != '' && compatible && fingerPrints ? [styles.btndn] : [styles.btndn, { width: '100%', borderRadius: 5 }]} onPress={() => login()}><Text style={styles.textbtndn}>ĐĂNG NHẬP</Text></TouchableOpacity>
                    {userIdFromDevice != '' && compatible && fingerPrints && <TouchableOpacity style={styles.btnFinger}><Ionicons name='finger-print-outline' size={35} color='white' onPress={() => {
                        scanFingerprint();
                    }} /></TouchableOpacity >}
                </View>
            </View>
            <View style={styles.contact}>
                <View style={styles.contactItem}>
                    <Icon
                        name='phone-call'
                        type='feather'
                        color='#517fa4'
                        size={20}
                    />
                    <Text style={styles.contactText}>
                        028 3875 4536
                    </Text>
                </View>
                <View style={styles.contactItem}>
                    <Icon
                        name='mail'
                        type='feather'
                        color='#517fa4'
                        size={20}
                    />
                    <Text style={styles.contactText}>
                        lactycom@lacty.com.vn
                    </Text>
                </View>
            </View>


        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    td: {
        color: '#2D5881',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tinyLogo: {
        width: 80,
        height: 80
    },
    tieude: {
        width: '100%',
        paddingHorizontal: 20,
        // height: 200,
        justifyContent: 'flex-end',
        textAlign: 'center'
    }, form: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 30
    }, inputlogin: {
        backgroundColor: 'white',
        borderRadius: 10
    }, btndn: {
        marginTop: 30,
        width: '80%',
        height: 55,
        backgroundColor: '#0D4A85',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }, textbtndn: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    btnFinger: {
        marginTop: 30,
        marginLeft: 2,
        width: '20%',
        height: 55,
        backgroundColor: '#0D4A85',
        borderBottomEndRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contact: {
        marginTop: 60,
        alignItems: 'center'
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    contactText: {
        marginLeft: 10,
        color: '#0D4A85',
        fontWeight: 'bold'
    }
});


