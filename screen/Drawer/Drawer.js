import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import { Drawer } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

export default function DrawerContent(props) {
    const dispatch = useDispatch();
    const logout = () => {
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
                            <Icon
                                name="exit-to-app"
                                color="blue"
                                size={26}
                            />
                        )}
                        label="Đăng Xuất"
                        onPress={() => { logout() }}
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