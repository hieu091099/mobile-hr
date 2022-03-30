import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BASE_URL, getToken } from '../../config'
import { useDispatch, useSelector } from 'react-redux';
import { getSalaryAction } from '../../redux/actions/UserAction';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export default function Salary() {
    const [salaryDetail, setSalaryDetail] = useState();
    const [userIdFromDevice, setUserIdFromDevice] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const { salary, indexScreen } = useSelector(state => state.UserReducer);
    const [salaryTest, setSalaryTest] = useState([]);
    console.log(salary.Final_Salary);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    getToken('user').then(res => {
        if (res != "" || res != undefined) {
            res = JSON.parse(res);
            setUserIdFromDevice(res.userId)
        }
    })
    getToken('accessToken').then(res => {
        if (res != "" || res != undefined) {
            res = JSON.parse(res);
            setAccessToken(res);
        }

    })
    const formatNum = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    useEffect(() => {
        if (salary == "") {
            getToken('user').then(res => {
                if (res != "" || res != undefined) {
                    res = JSON.parse(res);
                    let personId = res.userId;
                    getToken('accessToken').then(res => {
                        if (res != "" || res != undefined) {
                            res = JSON.parse(res);
                            let accessToken = res.accessToken;
                            dispatch(getSalaryAction(personId, accessToken));
                        }
                    })
                }
            })
        }
    }, []);

    return (
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20, backgroundColor: '#F7F7F7' }}>
            {salary == "" ? <ActivityIndicator size="large" /> : <View style={{ width: '93%', height: '100%' }}>
                <View style={styles.total}>
                    <View style={styles.total1}>
                        <View style={styles.totalMonth}>
                            <Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Tổng lương nhận tháng này</Text>

                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>{salary?.Final_Salary != "" ? formatNum(salary.Final_Salary) : ''} VNĐ</Text>
                            {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>1.000.000.000 VNĐ</Text> */}
                        </View>
                    </View>
                    <View style={styles.total1}>
                        <View style={styles.threecolunm}>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Công TT</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Working_Days}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>T.Ca lũy kế</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Overtime}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Loại bình bầu</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Rating_ID}</Text></View>
                        </View>
                    </View>

                </View>
                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20, letterSpacing: 3 }}>Chi tiết </Text>
                <ScrollView>
                    <View style={styles.detailSalary}>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương chính</Text><Text style={styles.rightsalary}>5.200.000 VND</Text></View>
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
            </View>}

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


