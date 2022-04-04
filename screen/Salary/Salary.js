import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BASE_URL, getToken } from '../../config'
import { useDispatch, useSelector } from 'react-redux';
import { getSalaryAction } from '../../redux/actions/UserAction';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Icon, ListItem } from 'react-native-elements';
export default function Salary() {
    const [salaryDetail, setSalaryDetail] = useState();
    const [userIdFromDevice, setUserIdFromDevice] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const { salary } = useSelector(state => state.UserReducer);
    const navigation = useNavigation();
    const [expandedPlus, setExpandedPlus] = useState(true);
    const [expandedMinus, setExpandedMinus] = useState(true);
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
        // if (salary == "") {
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
        // }
    }, []);
    return (
        <View style={{ alignItems: 'center', marginTop: 20, backgroundColor: '#F7F7F7' }}>
            {salary == "" ? <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}><ActivityIndicator style={{ marginTop: '25%' }} size={65} color="#0D4A85" /></View> : <View style={{ width: '93%', height: '100%' }}>
                <View style={styles.total}>
                    <View style={styles.total1}>
                        <View style={styles.totalMonth}>
                            <Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16 }}>Tổng lương nhận tháng này</Text>

                            {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>{salary?.Final_Salary != "" ? formatNum(salary.Final_Salary) : ''} VNĐ</Text> */}
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>1.000.000.000 VNĐ</Text>
                        </View>
                    </View>
                    <View style={styles.total1}>
                        <View style={styles.threecolunm}>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Công TT</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Working_Days}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>T.Ca lũy kế</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Overtime}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Loại bình bầu</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Rating_ID.trim()}</Text></View>
                        </View>
                    </View>
                    <View style={styles.total1}>
                        <View style={styles.threecolunm}>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Số phép năm</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Annual_Leave}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Đã nghỉ</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Leave_Days}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Còn lại</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{salary?.Annual_Leave - salary?.Leave_Days}</Text></View>
                        </View>
                    </View>
                </View>
                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20, letterSpacing: 1 }}>Chi tiết </Text>
                <ListItem.Accordion
                    style={{ backgroundColor: 'blue', color: 'bue' }}
                    content={
                        <>
                            <ListItem.Content>
                                <ListItem.Title>KHOẢN CỘNG</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedPlus}
                    onPress={() => {
                        setExpandedPlus(!expandedPlus);
                    }}
                >
                    <ScrollView style={{ height: '60%' }}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Lương chính </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Main_Salary)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > PC công việc </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Responsibility_Allowance + salary?.Language_Allowance + salary?.Other_Allowance)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > PC độc hại </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > PC VSMT </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > PC An toàn viên </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > PC PCCC </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Lương + PC </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Salary_And_Allowance)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Lương tháng </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Salary_Of_Month)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền làm thêm </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Overtime_Pay)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > PC ca đêm </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Night_Working_Money)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền ngừng việc(NV1) </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền ngừng việc(NV2) </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền ngừng việc(NV3) </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền chuyên cần </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Hard_Working)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Phí sinh hoạt </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Living_Costs)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền bình bầu </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Rating_Money)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền nghỉ phép </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.P_R_Money)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền nghỉ lễ </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Holiday_Money)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Thưởng bình bầu năm </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Yearly_Rating)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền SLĐ1 </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Serving_Pay_1)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền SLĐ2 </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Serving_Pay_2)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền khác </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Other_Pay)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền hổ trợ phí SH </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Serving_Pay_1)} VND</ListItem.Title>
                        </ListItem>
                    </ScrollView>
                </ListItem.Accordion>
                <ListItem.Accordion
                    content={
                        <>
                            {/* <Icon name="place" size={30} /> */}
                            <ListItem.Content>
                                <ListItem.Title>KHOẢN TRỪ</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedMinus}
                    onPress={() => {
                        setExpandedMinus(!expandedMinus);
                    }}
                >
                    <ScrollView>

                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tạm ứng </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Advance_Payment)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền BHXH </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Social_Insurance)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền BHYT </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Health_Insurance)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Tiền BHTN </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Unemployment_Insurance)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Đoàn phí </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Union_Pay)} VND</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title > Thuế TNCN </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{formatNum(salary?.Person_Income_Tax_Money)} VND</ListItem.Title>
                        </ListItem>
                    </ScrollView>
                </ListItem.Accordion>

            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    total: {
        width: '100%',
        height: '28%',
        backgroundColor: '#0D4A85',
        justifyContent: 'space-evenly',
        borderRadius: 8
    },
    total1: {
        width: '100%',
        height: 60,
        paddingHorizontal: 10
    }, totalMonth: {

    }, detailSalary: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        marginTop: '5%'
    }, rowsalary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10
    }, leftsalary: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333'
    }, rightsalary: {
        fontSize: 20,
        color: '#2C3667'
    },
    threecolunm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'

    }, colunm: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

