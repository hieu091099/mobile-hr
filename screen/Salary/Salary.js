import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Modal, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { BASE_URL, getToken } from '../../config'
import { useDispatch, useSelector } from 'react-redux';
import { getSalaryAction } from '../../redux/actions/UserAction';
import { Icon, ListItem } from 'react-native-elements';
import DatePicker from 'react-native-modern-datepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Salary() {

    const { salary } = useSelector(state => state.UserReducer);
    const [expandedPlus, setExpandedPlus] = useState(true);
    const [expandedMinus, setExpandedMinus] = useState(true);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectDate, setSelectDate] = useState(new Date().getFullYear() + ' ' + (new Date().getMonth()));
    const [noData, setNoData] = useState(false);
    const [date, setDate] = useState();

    const formatNum = (num) => {
        if (typeof num == 'number') {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        } else {
            return num;
        }
    }
    useEffect(() => {
        getToken('user').then(res => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken('accessToken').then(res => {
                    if (res != "" || res != undefined) {
                        dispatch(getSalaryAction(res, { "personId": personId, "monthYear": selectDate.replace(" ", "-") }));
                    }
                })
            }
        })
    }, [selectDate]);
    return (
        <View style={{ alignItems: 'center', marginTop: 20, backgroundColor: '#F7F7F7', flex: 1 }}>
            {/* <View style={{flex:1,justifyContent: 'center', alignItems: 'center',height:100,width:100}}> */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#00000078' }} onPress={() => { setModalVisible(false); }}>
                    <DatePicker
                        options={{
                            selectedTextColor: 'white',
                            mainColor: '#0D4A85'
                        }}
                        selected={selectDate}
                        mode="monthYear"
                        onMonthYearChange={(selectedDate) => {
                            setSelectDate(selectedDate);
                            if (selectedDate.split(" ")[0] > new Date().getFullYear() || (selectedDate.split(" ")[1] > new Date().getMonth() && selectedDate.split(" ")[0] == new Date().getFullYear())) {
                                setNoData(true);
                            } else {
                                setNoData(false);
                            }
                            setModalVisible(false)
                        }
                        }
                        current={selectDate}
                        style={{ borderRadius: 10 }}
                    />
                </Pressable >
            </Modal>
            {salary == "" ? <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}><ActivityIndicator style={{ marginTop: '25%' }} size={65} color="#0D4A85" /></View> : <View style={{ width: '93%', height: '100%' }}>
                <View style={styles.total}>

                    {!noData && <View style={styles.total1}>
                        <View style={styles.totalMonth}>
                            <Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 16, marginBottom: -8, marginTop: 5, marginLeft: 10 }}>Tổng lương nhận tháng  <Text onStartShouldSetResponder={() => setModalVisible(true)} style={{ textDecorationLine: 'underline', color: 'white' }}>{selectDate.split(' ')[1]} - {selectDate.split(' ')[0]}</Text></Text>

                            <Text style={{ color: 'white', fontWeight: '900', fontSize: 35 }}>{salary?.Final_Salary != "" ? formatNum(salary.Final_Salary) : ''} VNĐ</Text>
                            {/* <Text style={{ color: 'white', fontWeight: '900', fontSize: 35, marginLeft: 5 }}>100.000.000 VNĐ</Text> */}
                        </View>
                    </View>}
                    {noData ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name='calendar' size={40} color='white' style={{ position: 'absolute', right: 10, top: -40, elevation: 1 }} onPress={() => setModalVisible(true)} />
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require('../../assets/images/nodata_white.png')}
                        />
                        <Text style={{ color: 'white' }}>No data</Text>
                    </View> : <><View style={styles.total1}>
                        <View style={styles.threecolunm}>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Công TT</Text>
                                <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>{salary?.Working_Days}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>T.Ca lũy kế</Text>
                                <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>{salary?.Overtime}</Text></View>
                            <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Loại bình bầu</Text>
                                <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>{salary?.Rating_ID.trim()}</Text></View>
                        </View>
                    </View>
                        <View style={styles.total1}>
                            <View style={styles.threecolunm}>
                                <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Số phép năm</Text>
                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>{salary?.Annual_Leave}</Text></View>
                                <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Đã nghỉ</Text>
                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>{salary?.Leave_Days}</Text></View>
                                <View style={styles.colunm}><Text style={{ color: '#B5B9CA', fontWeight: '300', fontSize: 15 }}>Còn lại</Text>
                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>{salary?.Annual_Leave - salary?.Leave_Days}</Text></View>
                            </View>
                        </View></>}
                </View>
                <Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, fontWeight: '900', fontSize: 20, letterSpacing: 1 }}>Lương chi tiết </Text>
                {noData ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80, marginTop: 50 }}
                        source={require('../../assets/images/nodata.png')}
                    />
                    <Text>No data</Text>
                </View> : <><ListItem.Accordion
                    style={{ backgroundColor: 'blue', color: 'bue' }}
                    content={
                        <>
                            <ListItem.Content>
                                <ListItem.Title style={[styles.font, { color: '#0D4A85', fontWeight: 'bold' }]}>KHOẢN CỘNG</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedPlus}
                    onPress={() => {
                        setExpandedPlus(!expandedPlus);
                    }}
                >
                    <ScrollView style={{ height: '56%' }}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Lương chính </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Main_Salary)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >PC công việc </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Responsibility_Allowance + salary?.Language_Allowance + salary?.Other_Allowance)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >PC độc hại </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >PC VSMT </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >PC An toàn viên </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >PC PCCC </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Lương + PC </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Salary_And_Allowance)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Lương tháng </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Salary_Of_Month)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền làm thêm </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Overtime_Pay)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >PC ca đêm </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Night_Working_Money)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền ngừng việc(NV1) </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền ngừng việc(NV2) </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền ngừng việc(NV3) </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền chuyên cần </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Hard_Working)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Phí sinh hoạt </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Living_Costs)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền bình bầu </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Rating_Money)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền nghỉ phép </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.P_R_Money)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền nghỉ lễ </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Holiday_Money)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Thưởng bình bầu năm </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Yearly_Rating)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền SLĐ1 </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Serving_Pay_1)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền SLĐ2 </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Serving_Pay_2)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền khác </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Other_Pay)} VNĐ</ListItem.Title>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.font} >Tiền hổ trợ phí SH </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={styles.font}>{formatNum(salary?.Serving_Pay_1)} VNĐ</ListItem.Title>
                        </ListItem>
                    </ScrollView>
                </ListItem.Accordion>
                    <ListItem.Accordion
                        content={
                            <>
                                {/* <Icon name="place" size={30} /> */}
                                <ListItem.Content>
                                    <ListItem.Title style={[styles.font, { color: '#0D4A85', fontWeight: 'bold' }]}>KHOẢN TRỪ</ListItem.Title>
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
                                    <ListItem.Title style={styles.font} >Tạm ứng </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={styles.font}>{formatNum(salary?.Advance_Payment)} VNĐ</ListItem.Title>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.font} >Tiền BHXH </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={styles.font}>{formatNum(salary?.Social_Insurance)} VNĐ</ListItem.Title>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.font} >Tiền BHYT </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={styles.font}>{formatNum(salary?.Health_Insurance)} VNĐ</ListItem.Title>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.font} >Tiền BHTN </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={styles.font}>{formatNum(salary?.Unemployment_Insurance)} VNĐ</ListItem.Title>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.font} >Đoàn phí </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={styles.font}>{formatNum(salary?.Union_Pay)} VNĐ</ListItem.Title>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.font} >Thuế TNCN </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title style={styles.font}>{formatNum(salary?.Person_Income_Tax_Money)} VNĐ</ListItem.Title>
                            </ListItem>
                        </ScrollView>
                    </ListItem.Accordion></>}

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
        borderRadius: 8,
        position: 'relative'
    },
    total1: {
        width: '100%',
        height: 60,
        paddingHorizontal: 10,
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
        fontWeight: '900',
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
    },
    font: {
        fontFamily: 'Monda',
    }
});

