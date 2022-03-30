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

    // console.log(isLoggedIn);
    useEffect(() => {
        // if (!isLoggedIn) {
        //     navigation.navigate('Login');
        // }
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
        <View style={{ backgroundColor: '#F2F6F9', height: '100%', width: '100%' }}>
            <View style={styles.header}>
                <Text style={{ color: '#B8BBC7' }}>Chào {User?.fullName} !</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, color: '#2D5881' }}>LACTY COMPANY</Text>
            </View>

            <View style={styles.menu}>
                <View style={styles.chuamenu}>
                    <View style={styles.boxmenu}>
                        <View style={styles.boxmenuimg} >
                            <Image style={styles.menuimg} source={require('../../assets/images/menu_salary.png')} />
                        </View>
                        <Text style={styles.menutext}>Lương</Text>
                    </View>
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
            </View>
            <Text style={{ paddingHorizontal: 20, marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}>Cập nhật mới nhất</Text>
            <ScrollView style={{ height: '10%' }}>
                <View style={{ height: '100%', paddingHorizontal: 10 }}>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Khảo sát</Text>
                        <Text style={styles.titletb}>Lấy ý kiến về việc abcdxyz</Text>
                    </View>
                    <View style={styles.tb}>
                        <Text style={styles.typetb}>Thông báo</Text>
                        <Text style={styles.titletb}>Thực đơn từ 17/03/2022 - 19/03/2022</Text>
                    </View>
                    <View style={styles.tb}>
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
        height: '10%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        paddingLeft: 20
    },
    menu: {
        height: '30%',
        marginTop: 10,
        width: '100%'
    },
    menuimg: {
        width: 80,
        height: 80
    },
    boxmenuimg: {
        width: 80,
        height: 80,
        borderRadius: 20
    },
    menutext: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },
    boxmenu: {
        width: '30%',
        height: 120,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center'
    },
    chuamenu: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tb: {
        height: 95,
        backgroundColor: '#FFFFFF',
        marginBottom: 30,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#dfdfdf',
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