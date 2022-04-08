import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import { Drawer } from 'react-native-paper';
// import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DrawerContent(props) {
    const dispatch = useDispatch();
    const logout = (props) => {
        props.navigation.closeDrawer()
        dispatch({
            type: 'LOGOUT',
        })

    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
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