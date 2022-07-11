import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Modal,
    Pressable,
    Image,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { axiosInstanceToken, getToken } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryAction } from "../../redux/actions/UserAction";
import DatePicker from "react-native-modern-datepicker";
import FeatherIcon from "react-native-vector-icons/Feather";
import SalaryDetail from "../../components/SalaryDetail/SalaryDetail";
import { multilang } from "../../language/multilang";
import { usePreventScreenCapture } from "expo-screen-capture";

export default function Salary() {
    usePreventScreenCapture();
    const [onLoad, setOnLoad] = useState(false);
    const { salary, lang } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [showSalary, setShowSalary] = useState(false);
    const [selectDate, setSelectDate] = useState("");

    const formatNum = (num) => {
        if (typeof num == "number") {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        } else {
            return num;
        }
    };
    const getLastYearMonthSalary = async (accessToken) => {
        try {
            let result = await axiosInstanceToken(
                "GET",
                "salary/getLastMonthConfirm",
                accessToken,
            );
            return result.data.month;
        } catch (e) {
            // console.log(e);
        }
    };
    const pad = (num) => (num.length == 1 ? "0" : "") + num;
    useEffect(() => {
        funcEff();
    }, [selectDate]);
    const funcEff = () => {
        setOnLoad(true);
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then((res) => {
                    if (res != "" || res != undefined) {
                        getLastYearMonthSalary(res).then((mY) => {
                            if (selectDate != "") {
                                dispatch(
                                    getSalaryAction(res, personId, selectDate),
                                );
                            } else {
                                setSelectDate(mY);
                                dispatch(getSalaryAction(res, personId, mY));
                            }
                            setTimeout(() => {
                                setOnLoad(false);
                            }, 1000);
                        });
                    }
                });
            }
        });
    };
    return (
        <>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            funcEff();
                            // setSelectYear('2022');
                        }}
                    />
                }>
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
                                selected={selectDate?.replace("-", " ")}
                                mode="monthYear"
                                onMonthYearChange={(selectedDate) => {
                                    setSelectDate(
                                        selectedDate.replace(" ", "-"),
                                    );
                                    setModalVisible(false);
                                }}
                                current={selectDate}
                                style={{ borderRadius: 10 }}
                            />
                        </Pressable>
                    </Modal>
                    {/* {salary == "" ? (
                    <View style={styles.wrapperLoading}>
                        <ActivityIndicator
                            style={{ marginTop: "25%" }}
                            size={65}
                            color="#0D4A85"
                        />
                    </View>
                ) : ( */}
                    <View style={{ width: "93%", height: "100%", flex: 1 }}>
                        <View style={styles.summary}>
                            <View style={{ marginLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}>
                                    <Text style={styles.textTitle}>
                                        {multilang[lang].tongLuongNhan}
                                        <Text
                                            style={{
                                                textDecorationLine: "underline",
                                                color: "white",
                                            }}>
                                            {selectDate?.split("-")[1]} -{" "}
                                            {selectDate?.split("-")[0]}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {salary?.Final_Salary != undefined ? (
                                <View>
                                    <View style={{ marginLeft: 10 }}>
                                        {showSalary ? (
                                            <Text
                                                style={styles.textSalary}
                                                onPress={() => {
                                                    setShowSalary(false);
                                                }}>
                                                {salary?.Final_Salary != ""
                                                    ? formatNum(
                                                          salary.Final_Salary,
                                                      )
                                                    : ""}{" "}
                                                VNĐ{" "}
                                                <FeatherIcon
                                                    name="eye"
                                                    size={20}
                                                    onPress={() => {
                                                        setShowSalary(false);
                                                    }}
                                                />
                                            </Text>
                                        ) : (
                                            <Text
                                                style={styles.textSalary}
                                                onPress={() => {
                                                    setShowSalary(true);
                                                }}>
                                                ***.***.*** VNĐ{" "}
                                                <FeatherIcon
                                                    name="eye-off"
                                                    size={20}
                                                    onPress={() => {
                                                        setShowSalary(true);
                                                    }}
                                                />
                                            </Text>
                                        )}
                                    </View>
                                    <View>
                                        <View style={styles.row}>
                                            <View style={styles.column}>
                                                <Text
                                                    style={styles.contentText}>
                                                    {salary?.Working_Days}
                                                </Text>
                                                <Text style={styles.titleText}>
                                                    {multilang[lang].congTt}
                                                </Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text
                                                    style={styles.contentText}>
                                                    {salary?.Overtime}
                                                </Text>
                                                <Text style={styles.titleText}>
                                                    {multilang[lang].tCaLuyKe}
                                                </Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text
                                                    style={styles.contentText}>
                                                    {salary?.Rating_ID.trim()}
                                                </Text>
                                                <Text style={styles.titleText}>
                                                    {
                                                        multilang[lang]
                                                            .loaiBinhBau
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.row,
                                                { marginTop: 15 },
                                            ]}>
                                            <View style={styles.column}>
                                                <Text
                                                    style={styles.contentText}>
                                                    {salary?.Annual_Leave}
                                                </Text>
                                                <Text style={styles.titleText}>
                                                    {multilang[lang].soPhepNam}
                                                </Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text
                                                    style={styles.contentText}>
                                                    {salary?.Leave_Days}
                                                </Text>
                                                <Text style={styles.titleText}>
                                                    {multilang[lang].daNghi}
                                                </Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text
                                                    style={styles.contentText}>
                                                    {salary?.Annual_Leave -
                                                        salary?.Leave_Days}
                                                </Text>
                                                <Text style={styles.titleText}>
                                                    {multilang[lang].conLai}
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
                                    <Text style={{ color: "white" }}>
                                        {multilang[lang].khongCoDuLieu}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.titleSalaryDetail}>
                            {multilang[lang].luongChiTiet}
                        </Text>
                        {salary?.Final_Salary == undefined ? (
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        marginTop: 50,
                                    }}
                                    source={require("../../assets/images/nodata.png")}
                                />
                                <Text>{multilang[lang].khongCoDuLieu}</Text>
                            </View>
                        ) : (
                            <SalaryDetail salary={salary} />
                        )}
                    </View>
                </View>
            </ScrollView>
            {onLoad && (
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#00000021",
                    }}>
                    <ActivityIndicator size="large" color="#0D4A85" />
                </View>
            )}
        </>
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
        fontWeight: "600",
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
        fontWeight: "600",
        fontSize: 20,
        letterSpacing: 0.5,
    },
    contentText: {
        textAlign: "center",
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
});
