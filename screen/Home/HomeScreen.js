import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function HomeScreen() {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(state => state.UserReducer);
    const [User, setUser] = useState();
    const navigation = useNavigation();
    let arrName = user?.fullName.split(" ");
    let firstName = `${arrName[arrName.length - 2]} ${arrName[arrName.length - 1]}`;
    useEffect(() => {
        getToken('user').then(res => {
            if (res != "" || res != undefined) {
                setUser(JSON.parse(res))
            }
        })
    }, [isLoggedIn])
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
        })
    }
    getToken('user').then((res) => {
        if (res != "" || res != undefined) {
            res = JSON.parse(res);
        }
        // console.log({ res });
    })
    return (
        <View style={styles.home}>
            {/* <View style={styles.menu}>
                <View style={styles.chuamenu}>
                    <TouchableOpacity onPress={() => navigation.navigate("Salary")} style={styles.boxmenu}>
                        <View style={styles.boxmenuimg} >
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </TouchableOpacity>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_book.png')} />
                        </View>
                        <Text style={styles.menutext}>Sổ tay lao động</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_chat.png')} />
                        </View>
                        <Text style={styles.menutext}>Trò chuyện</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_feedback.png')} />
                        </View>
                        <Text style={styles.menutext}>Góp ý</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_contact.png')} />
                        </View>
                        <Text style={styles.menutext}>Liên hệ</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_help.png')} />
                        </View>
                        <Text style={styles.menutext}>Trợ giúp</Text>
                    </View>
                </View>
            </View> */}
            <View style={styles.titleHome}>
                <View>
                    <Text style={styles.titleName}>Hello {firstName},</Text>
                    <Text style={styles.titleBack}>Welcome back !</Text>
                </View>
                <View>
                    <Ionicons name="options" size={26} />
                </View>
            </View>
            <View style={styles.mainMenu}>
                <View>
                    <Text style={styles.titleMenu}>
                        Your Functional
                    </Text>
                </View>
                <View style={styles.menuWrapper}>
                    <View style={styles.menuItem}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Fontisto name="mastercard" color="#0D4A85" size={40} />
                            </View>
                            <Text style={styles.titleItem}>Salary</Text>
                            <Text style={styles.titleDetail}>View your salary</Text>
                        </View>
                    </View>
                    <View style={styles.menuItem}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Ionicons name="logo-github" color="#0D4A85" size={40} />
                            </View>
                            <Text style={styles.titleItem}>Github</Text>
                            <Text style={styles.titleDetail}>View your salary</Text>
                        </View>
                    </View>
                    <View style={styles.menuItem}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Ionicons name="logo-electron" color="#0D4A85" size={40} />

                            </View>
                            <Text style={styles.titleItem}>Electron</Text>
                            <Text style={styles.titleDetail}>View your salary</Text>
                        </View>
                    </View>
                    <View style={styles.menuItem}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Ionicons name="logo-instagram" color="#0D4A85" size={40} />

                            </View>
                            <Text style={styles.titleItem}>Instagram</Text>
                            <Text style={styles.titleDetail}>View your salary</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.menuProg}>
                <View>
                    <Text style={[styles.titleMenu, { marginTop: 10 }]}>
                        Your Programs
                    </Text>
                </View>
                <View style={styles.menuWrapperProg}>
                    <ScrollView style={{ height: '62%' }}>
                        <View style={styles.menuContainItem}>
                            <View style={styles.menuContainItemLeft}>
                                <View style={styles.boxIcon}>
                                    <Ionicons name="logo-electron" color="#0D4A85" size={30} />
                                </View>
                                <View >
                                    <Text style={styles.contentItem}>
                                        Sale
                                    </Text>
                                    <Text style={styles.titleDetail}>
                                        View details
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Ionicons name="ios-chevron-forward" color="#0D4A85" size={30} />
                            </View>
                        </View>
                        <View style={styles.menuContainItem}>
                            <View style={styles.menuContainItemLeft}>
                                <View style={styles.boxIcon}>
                                    <Ionicons name="logo-electron" color="#0D4A85" size={30} />
                                </View>
                                <View >
                                    <Text style={styles.contentItem}>
                                        Sale
                                    </Text>
                                    <Text style={styles.titleDetail}>
                                        View details
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Ionicons name="ios-chevron-forward" color="#0D4A85" size={30} />
                            </View>
                        </View>
                        <View style={styles.menuContainItem}>
                            <View style={styles.menuContainItemLeft}>
                                <View style={styles.boxIcon}>
                                    <Ionicons name="logo-electron" color="#0D4A85" size={30} />
                                </View>
                                <View >
                                    <Text style={styles.contentItem}>
                                        Sale
                                    </Text>
                                    <Text style={styles.titleDetail}>
                                        View details
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Ionicons name="ios-chevron-forward" color="#0D4A85" size={30} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    home: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    titleHome: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleName: {
        fontSize: 25,
        fontWeight: 'bold',
        // color: 'black'
        color: '#0D4A85'
    },
    titleBack: {
        fontSize: 13,
        letterSpacing: 1,
        color: 'gray',
        fontWeight: 'bold'
    },
    mainMenu: {
        marginTop: 20
    },
    titleMenu: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5C5C5C'
    },
    menuWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    menuItem: {
        flexBasis: '50%',
        paddingVertical: 6,
        paddingHorizontal: 6
    },
    menuItemBox: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebf7fa',
        borderRadius: 10,
        padding: 10
    },
    containIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleItem: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D4A85'
    },
    titleDetail: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#69737a'
    },
    menuWrapperProg: {
        paddingHorizontal: 10
    },
    menuContainItem: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 8,
        borderRadius: 20,
        borderColor: '#EEEEEE'
    },
    menuContainItemLeft: {
        flexDirection: 'row'
    },
    boxIcon: {
        padding: 8,
        marginRight: 20,
        marginLeft: 15,
        backgroundColor: '#ebf7fa',
        borderRadius: 50
    },
    contentItem: {
        fontWeight: 'bold',
        fontSize: 18
    }
});
