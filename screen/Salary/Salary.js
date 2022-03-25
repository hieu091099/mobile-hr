import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Salary() {
    return (
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20, backgroundColor: '#F7F7F7' }}>
            <View style={{ width: '93%', height: '100%' }}>
                <View style={styles.total}>
                    <View style={styles.total1}>
                        <View style={styles.totalMonth}>
                            <Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Tổng lương nhận tháng này</Text>

                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>12.859.000 VND</Text>
                        </View>
                    </View>
                    <View style={styles.total1}>
                        <View style={styles.threecolunm}>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Thuế 1</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>10.000.000</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Thuế 1</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>10.000.000</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Thuế 1</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>10.000.000</Text></View>
                        </View>
                    </View>

                </View>
                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20, letterSpacing: 3 }}>Chi tiết </Text>
                <ScrollView>
                    <View style={styles.detailSalary}>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương cơ bản</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>


                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    total: {
        width: '100%',
        height: '28%',
        backgroundColor: '#3D4675',
        display: 'flex',
        justifyContent: 'space-evenly',
        borderRadius: 8
    },
    total1: {
        width: '100%',
        height: 80,
        paddingHorizontal: 10
    }, totalMonth: {
        display: 'flex'
    }, detailSalary: {
        width: '100%',
        height: '63%',
        backgroundColor: 'white',
        marginTop: '5%', paddingVertical: 10, paddingHorizontal: 10
    }, rowsalary: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    }, leftsalary: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333'
    }, rightsalary: {
        fontSize: 20,
        color: '#2C3667'
    },
    threecolunm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'

    }, colunm: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


