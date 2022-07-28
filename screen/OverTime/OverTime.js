import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";
import Anticons from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getToken, renderMonth3Lang } from "../../config";
import { getOverTime } from "../../redux/actions/UserAction";
import moment from "moment";
import DatePicker from "react-native-modern-datepicker";
import { color } from "react-native-reanimated";
import { multilang } from "../../language/multilang";

export default function OverTime() {
    const [activeSections, setActiveSections] = useState([]);
    const [countDate, setCountDate] = useState(0);
    const [sumHour, setSumHour] = useState(0);
    const [onLoad, setOnLoad] = useState(false);

    const { listOverTime, lang } = useSelector((state) => state.UserReducer);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectYear, setSelectYear] = useState(new Date().getFullYear());
    const dispatch = useDispatch();
    // console.log(listOverTime);

    useEffect(() => {
        funcEff();
    }, [selectYear]);
    const funcEff = () => {
        setOnLoad(true);
        dispatch({
            type: "GET_ONLEAVE",
            onLeave: [],
        });
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then(async (res) => {
                    //  // console.log(res);
                    await dispatch(getOverTime(res, "24751", selectYear));
                    setOnLoad(false);
                });
            }
        });
    };
    const tongGioThang = (thang) => {
        let sumOvertime = 0;
        listOverTime.filter((v) =>
            moment(v?.Check_Day).format("MM") == thang
                ? (sumOvertime += v.Overtime)
                : 0,
        );
        return sumOvertime;
    };
    const tongNgayGio = (act) => {
        // act = 0 => tổng giờ tăng ca
        // act = 1 => tổng ngày tăng ca
        let tongngay = 0;
        let tonggio = 0;

        listOverTime?.forEach((element) => {
            console.log({ element });
            if (element.YN == 5) {
                tonggio += Number(element.Overtime);
                tongngay += 1;
            }
        });
        switch (act) {
            case 0:
                return tonggio;
            case 1:
                return tongngay;
        }
    };
    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };
    const renderHeaderMonth = (section, _, isActive) => {
        //Accordion Header view
        return (
            <View
                style={{
                    backgroundColor: "red",
                    height: 75,
                    alignItems: "center",
                    backgroundColor: isActive ? "#0D4A85" : "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <View>
                    <Text
                        style={[
                            styles.font,
                            {
                                color: isActive ? "white" : "#0D4A85",
                                fontWeight: "bold",
                                fontSize: 19,
                                paddingLeft: 20,
                                marginBottom: 5,
                            },
                        ]}>
                        {/* Tháng {section} */}
                        {renderMonth3Lang(lang, section)}
                    </Text>
                    <Text
                        style={[
                            styles.font,
                            {
                                color: isActive ? "white" : "#3d6b97",
                                fontWeight: "bold",
                                fontSize: 13,
                                paddingLeft: 20,
                            },
                        ]}>
                        <Ionicons name="ios-time-outline" size={15} />{" "}
                        {tongGioThang(section)}
                        {" " + multilang[lang].gio}
                    </Text>
                </View>
                <Text
                    style={[
                        styles.font,
                        {
                            color: isActive ? "white" : "#0D4A85",
                            fontWeight: "bold",
                            fontSize: 15,
                            paddingRight: 20,
                        },
                    ]}>
                    <Anticons name={isActive ? "up" : "down"} size={20} />
                </Text>
                {/* down */}
            </View>
        );
    };
    const renderContentMonth = (section, _, isActive) => {
        let data = listOverTime.filter((v) => {
            return moment(v?.Check_Day).format("MM") == section;
        });
        if (data.length == 0) {
            return (
                <View style={styles.leaveItem}>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text>{multilang[lang].khongCoDuLieu}</Text>
                    </View>
                </View>
            );
        } else {
            return data.map((item, index) => {
                if (moment(item?.Check_Day).format("MM") == section) {
                    return (
                        <View style={styles.leaveItem} key={index}>
                            <View style={styles.itemLeft}>
                                <Text
                                    style={styles.leaveTitle}
                                    numberOfLines={1}>
                                    {multilang[lang].ngayLamThem}
                                </Text>
                                <Text style={styles.leaveDate}>
                                    {`${moment(item?.Check_Day).format(
                                        "DD/MM/YYYY",
                                    )}`}
                                </Text>
                                <Text>
                                    {item.Overtime} {multilang[lang].gio}
                                </Text>
                            </View>
                            <View style={{ maxWidth: "30%" }}>
                                {/* <Text>213</Text> */}
                                <View
                                    style={{
                                        alignSelf: "flex-end",
                                        marginTop: 10,
                                    }}>
                                    <Ionicons
                                        name="bookmark-outline"
                                        size={26}
                                        color="gray"
                                    />
                                </View>
                            </View>
                        </View>
                    );
                }
            });
        }
    };

    const renderYear = () => {
        let arr = [];
        for (
            let i = new Date().getFullYear() - 14;
            i <= new Date().getFullYear();
            i++
        ) {
            arr.push(
                <TouchableOpacity
                    key={i}
                    style={[styles.Year, i == selectYear && styles.focusYear]}
                    onPress={() => {
                        setSelectYear(i);
                        setModalVisible(false);
                    }}>
                    <Text
                        style={[
                            styles.textYear,
                            i == selectYear && {
                                color: "white",
                                fontWeight: "bold",
                            },
                        ]}>
                        {i}
                    </Text>
                </TouchableOpacity>,
            );
        }
        return arr.reverse();
    };
    const groupByMonth = (objectArray) => {
        let arr = [];
        objectArray.forEach((element) => {
            let index = arr.indexOf(moment(element?.Check_Day).format("MM"));

            if (index == -1 && element.YN != 0) {
                arr.push(moment(element?.Check_Day).format("MM"));
            }
        });
        return arr.sort();
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
                        }}
                    />
                }>
                <View
                    style={{ paddingHorizontal: 10, paddingTop: 10, flex: 1 }}>
                    <View style={styles.summary}>
                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(true);
                                }}>
                                <Text
                                    style={{
                                        color: "#B5B9CA",
                                        fontWeight: "300",
                                        fontSize: 16,
                                    }}>
                                    <Text
                                        style={{
                                            color: "#B5B9CA",
                                            fontWeight: "300",
                                            fontSize: 16,
                                        }}>
                                        {multilang[lang].chiTietLamThemGio}{" "}
                                        <Text style={styles.textTitle}>
                                            {selectYear}
                                        </Text>
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View>
                                <View style={[styles.row, { marginTop: 10 }]}>
                                    <View style={styles.column}>
                                        <Text style={styles.contentText}>
                                            300{" " + multilang[lang].gio}
                                        </Text>
                                        <Text style={styles.titleText}>
                                            {multilang[lang].lamThemToiDa}
                                        </Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.contentText}>
                                            {tongNgayGio(1)}
                                            {" " + multilang[lang].ngay}
                                        </Text>
                                        <Text style={styles.titleText}>
                                            {multilang[lang].soNgayTangCa}
                                        </Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.contentText}>
                                            {tongNgayGio(0)}
                                            {" " + multilang[lang].gio}
                                        </Text>
                                        <Text style={styles.titleText}>
                                            {multilang[lang].soGioTangCa}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        {listOverTime.length != 0 &&
                        groupByMonth(listOverTime).length != 0 ? (
                            <Accordion
                                activeSections={activeSections}
                                sections={groupByMonth(listOverTime)}
                                touchableComponent={TouchableOpacity}
                                expandMultiple={false}
                                renderHeader={renderHeaderMonth}
                                renderContent={renderContentMonth}
                                duration={400}
                                onChange={setSections}
                            />
                        ) : (
                            <View
                                style={{
                                    alignItems: "center",
                                    marginTop: 30,
                                }}>
                                <Image
                                    style={{ width: 80, height: 80 }}
                                    source={require("../../assets/images/nodata.png")}
                                />
                                <Text style={{ color: "black" }}>
                                    {multilang[lang].khongCoDuLieu}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                    <Modal
                        propagateSwipe={true}
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
                            <View style={styles.pickYear}>
                                <ScrollView
                                    style={{ height: 300, width: "100%" }}>
                                    <Pressable
                                        style={[
                                            styles.pickYear,
                                            { width: "100%", padding: 10 },
                                        ]}>
                                        {renderYear()}
                                    </Pressable>
                                </ScrollView>
                            </View>
                        </Pressable>
                    </Modal>
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
    font: {},
    titleSalaryDetail: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: "600",
        fontSize: 20,
        letterSpacing: 0.5,
    },
    summary: {
        width: "100%",
        backgroundColor: "#0D4A85",
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 20,
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        width: "30%",
    },
    textTitle: {
        color: "white",
        fontWeight: "700",
        fontSize: 19,
        marginBottom: 10,
        textDecorationLine: "underline",
    },
    contentText: {
        textAlign: "center",
        color: "white",
        fontWeight: "600",
        fontSize: 19,
    },
    leaveItem: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#F1F1F3",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.32,
        // shadowRadius: 5.46,

        // elevation: 6,
    },
    itemLeft: {
        maxWidth: "70%",
    },
    leaveTitle: {
        color: "gray",
        fontWeight: "bold",
    },
    leaveDate: {
        fontSize: 24,
        fontWeight: "bold",
    },
    pickYear: {
        width: "90%",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    Year: {
        width: "30%",
        alignItems: "center",
        paddingVertical: 15,
    },
    textYear: {
        fontSize: 16,
        color: "black",
    },
    focusYear: {
        backgroundColor: "#0D4A85",
        borderRadius: 8,
    },
});
