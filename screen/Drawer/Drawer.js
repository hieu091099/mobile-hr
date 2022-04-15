import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useEffect } from 'react'
import { Drawer } from 'react-native-paper';
// import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { checkTokenExpired } from '../../config';
import DialogNavigate from '../../components/SimpleDialog/DialogNavigate';


export default function DrawerContent(props) {
    const dispatch = useDispatch();
    const { isVisibleExpired, messageExpiredToken } = useSelector(state => state.UserReducer);
    const logout = async (props) => {
        await props.navigation.closeDrawer()
        dispatch({
            type: 'LOGOUT',
        })
    }
    useEffect(() => {
        setInterval(() => {
            checkTokenExpired().then(res => {
                if (res === false) {
                    dispatch({
                        type: 'EXPIRED_TOKEN',
                        message: 'Phiên đăng nhập đã hết hạn! \nVui lòng đăng nhập lại để tiếp tục!'
                    })
                }
            })
        }, 5000)
    }, [])
    return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <DialogNavigate visible={isVisibleExpired} message={messageExpiredToken} />
                <DrawerContentScrollView {...props}>
                    <Text></Text>
                </DrawerContentScrollView>
                <Drawer.Section >
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="log-out-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Đăng Xuất"
                        onPress={() => { logout(props) }}
                    />
                </Drawer.Section>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});