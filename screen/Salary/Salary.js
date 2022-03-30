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
    const getSalary = async () => {
        try {
            let result = await axios({
                method: 'GET',
                url: BASE_URL + 'salary/29975'
            })
            setSalaryTest(result.data);
        } catch (e) {
            console.log(e)
        }
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
                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20, letterSpacing: 3 }}>Chi tiết </Text>
                <ScrollView stickyHeaderIndices={[0, 2]} style={styles.detailSalary}>
                    <View style={{ backgroundColor: '#0D4A85', paddingLeft: 10, borderRadius: 5 }}>
                        <Text style={{ paddingVertical: 10, fontWeight: 'bold', fontSize: 18, letterSpacing: 3, color: 'white' }}>KHOẢN CỘNG </Text>
                    </View>
                    <View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương chính</Text><Text style={styles.rightsalary}>{formatNum(salary?.Main_Salary)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>PC công việc</Text><Text style={styles.rightsalary}>{formatNum(salary?.Responsibility_Allowance + salary?.Language_Allowance + salary?.Other_Allowance)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>PC độc hại</Text><Text style={styles.rightsalary}> VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>PC VSMT</Text><Text style={styles.rightsalary}>VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>PC An toàn viên</Text><Text style={styles.rightsalary}> VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>PC PCCC</Text><Text style={styles.rightsalary}> VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương + PC</Text><Text style={styles.rightsalary}>{formatNum(salary?.Salary_And_Allowance)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Lương tháng</Text><Text style={styles.rightsalary}>{formatNum(salary?.Salary_Of_Month)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền làm thêm</Text><Text style={styles.rightsalary}>{formatNum(salary?.Overtime_Pay)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>PC ca đêm</Text><Text style={styles.rightsalary}>{formatNum(salary?.Night_Working_Money)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền ngừng việc(NV1)</Text><Text style={styles.rightsalary}> VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền ngừng việc(NV2)</Text><Text style={styles.rightsalary}> VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền ngừng việc(NV3)</Text><Text style={styles.rightsalary}> VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền chuyên cần</Text><Text style={styles.rightsalary}>{formatNum(salary?.Hard_Working)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Phí sinh hoạt</Text><Text style={styles.rightsalary}>{formatNum(salary?.Living_Costs)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền bình bầu</Text><Text style={styles.rightsalary}>{formatNum(salary?.Rating_Money)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền nghỉ phép</Text><Text style={styles.rightsalary}>{formatNum(salary?.P_R_Money)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền nghỉ lễ</Text><Text style={styles.rightsalary}>{formatNum(salary?.Holiday_Money)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Thưởng bình bầu năm</Text><Text style={styles.rightsalary}>{formatNum(salary?.Yearly_Rating)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền SLĐ1</Text><Text style={styles.rightsalary}>{formatNum(salary?.Serving_Pay_1)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền SLĐ2</Text><Text style={styles.rightsalary}>{formatNum(salary?.Serving_Pay_2)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền khác</Text><Text style={styles.rightsalary}>{formatNum(salary?.Other_Pay)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền hổ trợ phí SH</Text><Text style={styles.rightsalary}>{formatNum(salary?.Cost_Of_Living_Support)} VND</Text></View>

                    </View>
                    <View style={{ backgroundColor: '#0D4A85', paddingLeft: 10, borderRadius: 5 }}>
                        <Text style={{ paddingVertical: 10, fontWeight: 'bold', fontSize: 18, letterSpacing: 3, color: 'white' }}>KHOẢN TRỪ </Text>
                    </View>
                    <View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tạm ứng</Text><Text style={styles.rightsalary}>{formatNum(salary?.Advance_Payment)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền BHXH</Text><Text style={styles.rightsalary}>{formatNum(salary?.Social_Insurance)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền BHYT</Text><Text style={styles.rightsalary}>{formatNum(salary?.Health_Insurance)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Tiền BHTN</Text><Text style={styles.rightsalary}>{formatNum(salary?.Unemployment_Insurance)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Đoàn phí</Text><Text style={styles.rightsalary}>{formatNum(salary?.Union_Pay)} VND</Text></View>
                        <View style={styles.rowsalary}><Text style={styles.leftsalary}>Thuế TNCN</Text><Text style={styles.rightsalary}>{formatNum(salary?.Person_Income_Tax_Money)} VND</Text></View>
                    </View>

                    {/* </View> */}
                </ScrollView>
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    total: {
        width: '100%',
        height: '28%',
        backgroundColor: '#0D4A85',
        display: 'flex',
        justifyContent: 'space-evenly',
        borderRadius: 8
    },
    total1: {
        width: '100%',
        height: 60,
        paddingHorizontal: 10
    }, totalMonth: {
        display: 'flex'
    }, detailSalary: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        marginTop: '5%'
    }, rowsalary: {
        display: 'flex',
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


