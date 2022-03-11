import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
    const scanFingerprint = async () => {
        await LocalAuthentication.authenticateAsync().then(res => {
            alert('vô home');
        })
    };
    // const [compatible, isCompatible] = useState(false);
    // const [fingerPrints, setFingerPrints] = useState(false);
    const [text, setText] = useState({
        email: "",
        password: ""
    });
    return (
        <ImageBackground source={{ uri: 'https://images.pexels.com/photos/6694577/pexels-photo-6694577.jpeg' }} resizeMode="cover" style={{ width: '100%', height: '100%' }} blurRadius={3}>
            <View style={{ display: 'flex', alignItems: 'center' }}>

                <View style={styles.logo}>
                    <Image source={require('../image/LAI_logo.png')} />
                </View>
                <TextInput
                    style={styles.inputlogin}
                    label="Email"
                    value={text.email}
                    onChangeText={text => setText({ ...text, email: text })}
                />
                <TextInput
                    style={styles.inputlogin}
                    label="Password"
                    value={text.password}
                    onChangeText={text => setText({ ...text, password: text })}
                />
                <Button style={styles.inputlogin} icon="login" mode="contained" onPress={() => console.log('Pressed')}>
                    Đăng Nhập
                </Button>
                <View style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        scanFingerprint()
                    }}>
                        <Ionicons name="ios-finger-print-outline" size={50} />
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: '35%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    inputlogin: {
        marginVertical: 10,
        width: '90%'
    }
});
