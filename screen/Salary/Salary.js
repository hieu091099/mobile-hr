import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Modal,
    Pressable,
    Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getToken } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryAction } from "../../redux/actions/UserAction";
import DatePicker from "react-native-modern-datepicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import SalaryDetail from "../../components/SalaryDetail/SalaryDetail";

export default function Salary() {
    const { salary } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectDate, setSelectDate] = useState(
        new Date().getFullYear() + " " + (new Date().getDate() < 10 ? new Date().getMonth()-1 : new Date().getMonth()),
    );
    const formatNum = (num) => {
        if (typeof num == "number") {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        } else {
            return num;
        }
    };
    const pad = (num) => (num.length == 1 ? "0" : "") + num;
    useEffect(() => {
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then((res) => {
                    if (res != "" || res != undefined) {
                        dispatch(
                            getSalaryAction(
                                res,
                                personId,
                                selectDate.replace(" ", "-"),
                            ),
                        );
                    }
                });
            }
        });
    }, [selectDate]);

    return (
        <View style={styles.wrapper}>
            {/* <View style={{flex:1,justifyContent: 'center', alignItems: 'center',height:100,width:100}}> */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <Pressable
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        backgroundColor: "#00000078",
                    }}
                    onPress={() => {
                        setModalVisible(false);
                    }}>
                    <DatePicker
                        options={{
                            selectedTextColor: "white",
                            mainColor: "#0D4A85",
                        }}
                        selected={selectDate}
                        mode="monthYear"
                        onMonthYearChange={(selectedDate) => {
                            setSelectDate(selectedDate);
                            setModalVisible(false);
                        }}
                        current={selectDate}
                        style={{ borderRadius: 10 }}
                    />
                </Pressable>
            </Modal>
            {salary == "" ? (
                <View style={styles.wrapperLoading}>
                    <ActivityIndicator
                        style={{ marginTop: "25%" }}
                        size={65}
                        color="#0D4A85"
                    />
                </View>
            ) : (
                <View style={{ width: "93%", height: "100%" }}>
                    <View style={styles.summary}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.textTitle}>
                                Tổng lương nhận tháng{" "}
                                <Text
                                    onStartShouldSetResponder={() =>
                                        setModalVisible(true)
                                    }
                                    style={{
                                        textDecorationLine: "underline",
                                        color: "white",
                                    }}>
                                    {pad(selectDate.split(" ")[1])} -{" "}
                                    {selectDate.split(" ")[0]}
                                </Text>
                            </Text>
                        </View>
                        {salary?.Final_Salary != undefined ? (
                            <View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.textSalary}>
                                        {salary?.Final_Salary != ""
                                            ? formatNum(salary.Final_Salary)
                                            : ""}{" "}
                                        VNĐ
                                    </Text>

                                    {/* <Text style={styles.textSalary}>
                                        100.000.000 VNĐ
                                    </Text> */}
                                </View>
                                <View>
                                    <View style={styles.row}>
                                        <View style={styles.column}>
                                            <Text style={styles.titleText}>
                                                Công TT
                                            </Text>
                                            <Text style={styles.contentText}>
                                                {salary?.Working_Days}
                                            </Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.titleText}>
                                                T.Ca lũy kế
                                            </Text>
                                            <Text style={styles.contentText}>
                                                {salary?.Overtime}
                                            </Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.titleText}>
                                                Loại bình bầu
                                            </Text>
                                            <Text style={styles.contentText}>
                                                {salary?.Rating_ID.trim()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.column}>
                                            <Text style={styles.titleText}>
                                                Số phép năm
                                            </Text>
                                            <Text style={styles.contentText}>
                                                {salary?.Annual_Leave}
                                            </Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.titleText}>
                                                Đã nghỉ
                                            </Text>
                                            <Text style={styles.contentText}>
                                                {salary?.Leave_Days}
                                            </Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.titleText}>
                                                Còn lại
                                            </Text>
                                            <Text style={styles.contentText}>
                                                {salary?.Annual_Leave -
                                                    salary?.Leave_Days}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View
                                style={{
                                    alignItems: "center",
                                    marginTop: 30,
                                }}>
                                <Image
                                    style={{ width: 80, height: 80 }}
                                    source={require("../../assets/images/nodata_white.png")}
                                />
                                <Text style={{ color: "white" }}>No data</Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.titleSalaryDetail}>
                        Lương chi tiết{" "}
                    </Text>
                    {salary && salary.Final_Salary == undefined ? (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Image
                                style={{ width: 80, height: 80, marginTop: 50 }}
                                source={require("../../assets/images/nodata.png")}
                            />
                            <Text>No data</Text>
                        </View>
                    ) : (
                        <SalaryDetail salary={salary} />
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    summary: {
        width: "100%",
        backgroundColor: "#0D4A85",
        borderRadius: 8,
        paddingVertical: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        width: "30%",
    },
    wrapper: {
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "#F7F7F7",
        flex: 1,
    },
    wrapperLoading: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    },
    textTitle: {
        color: "#B5B9CA",
        fontWeight: "300",
        fontSize: 16,
    },
    textSalary: {
        color: "white",
        fontWeight: "900",
        fontSize: 35,
    },
    titleText: {
        textAlign: "center",
        color: "#B5B9CA",
        fontWeight: "300",
        fontSize: 15,
    },
    titleSalaryDetail: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: "900",
        fontSize: 20,
        letterSpacing: 0.5,
    },
    contentText: {
        textAlign: "center",
        color: "white",
        fontWeight: "900",
        fontSize: 16,
    },
    font: {
        fontFamily: "Monda",
    },
});
