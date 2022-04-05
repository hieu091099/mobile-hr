import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function HeaderHomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { navigation.toggleDrawer() }} style={styles.leftItem}>
                <Ionicons name='menu' size={30} />
            </TouchableOpacity>
            <View style={styles.rightItem}>
                <View style={styles.iconRight}>
                    <Ionicons name='md-notifications-circle-outline' size={30} />
                </View>
                <View style={styles.iconRight}>
                    <Ionicons name='person-circle' size={30} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    leftItem: {
        padding: 6,
        // backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderColor: '#EEEEEE',
        borderWidth: 1
    },
    rightItem: {
        flexDirection: 'row',
    },
    iconRight: {
        marginLeft: 10,
        padding: 6,
        // backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderColor: '#EEEEEE',
        borderWidth: 1
    }
})