import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../config';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(state => state.UserReducer);
    const [User, setUser] = useState();
    const navigation = useNavigation();

    console.log(isLoggedIn);
    useEffect(() => {
        // if (!isLoggedIn) {
        //     navigation.navigate('Login');
        // }
        getToken('user').then(res => {
            setUser(JSON.parse(res))

        })
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
        <View style={{ backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={{ color: '#B8BBC7' }}>Chào {User?.fullName} !</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, color: '#2D5881' }}>LACTY COMPANY</Text>
            </View>
            <ScrollView style={styles.menu} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.chuamenu}>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                </View>
                <View style={styles.chuamenu}>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg}>
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
                </View>
            </ScrollView>
            <Text style={{ paddingHorizontal: 20, marginVertical: 20, fontSize: 22, fontWeight: 'bold' }}>Cập nhật mới nhất</Text>
            <ScrollView style={{ height: 200, padding: 20 }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={[styles.tb, { backgroundColor: '#EFFCEF' }]}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                    <View style={[styles.tb, { backgroundColor: '#FFEFE2' }]}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                    <View style={[styles.tb, { backgroundColor: '#EFFCEF' }]}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={[styles.tb, { backgroundColor: '#FFEFE2' }]}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={[styles.tb, { backgroundColor: '#EFFCEF' }]}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                </View>
            </ScrollView>
        </View >
    )


}
const styles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        paddingLeft: 20
    },
    menu: {
        height: 300,
        marginTop: 10
    },
    menuimg: {
        width: 80,
        height: 80
    },
    boxmenuimg: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 20
    },
    menutext: {
        marginTop: 8,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    },
    boxmenu: {
        width: 100,
        height: 120,
        marginHorizontal: 5,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center'
    },
    chuamenu: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    tb: {
        backgroundColor: '#E6F5F9',
        marginBottom: 10,
        borderRadius: 35,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingTop: 40,
        paddingBottom: 40,
        // borderWidth: 1,
        // borderColor: '#dfdfdf',
        overflow: 'hidden'
    },
    typetb: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    titletb: {
        fontSize: 16,
        marginTop: 5
    }
});
{/* <View>
            <Text>Hello {user.userId} </Text>
            <Button
                onPress={() => logout()}
                title="Logout"
                color="#841584"
            />
    </View> */}


/** gửi cho người dòng tin nhắn, nhận ra vòng tròn không thấy thay màu */