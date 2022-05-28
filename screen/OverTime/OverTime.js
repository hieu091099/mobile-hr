import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";
import Anticons from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../config";
import { getOverTime } from "../../redux/actions/UserAction";
import moment from "moment";
import DatePicker from "react-native-modern-datepicker";
import { color } from "react-native-reanimated";
export default function OverTime() {
    const [activeSections, setActiveSections] = useState([]);
    const [countDate, setCountDate] = useState(0);
    const [sumHour, setSumHour] = useState(0);
    const [onLoad, setOnLoad] = useState(false);

    const { listOverTime } = useSelector((state) => state.UserReducer);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectYear, setSelectYear] = useState(new Date().getFullYear());
    const dispatch = useDispatch();
    useEffect(() => {
        setOnLoad(true);
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then(async (res) => {
                    //  // console.log(res);
                    await dispatch(getOverTime(res, personId, selectYear));
                    setOnLoad(false);
                });
            }
        });
    }, [selectYear]);
    const tongGioThang = (thang) => {
        let sumOvertime = 0;
        listOverTime.filter((v) =>
            moment(v?.Check_Day).format("MM") == thang
                ? (sumOvertime += v.Overtime)
                : 0,
        );
        return sumOvertime;
    };
    const tongNgay = () => {
        let tong = 0;
        listOverTime?.forEach((element) => {
            tong += Number(element.Overtime);
        });
        return tong;
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
                        Tháng {section}
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
                        {tongGioThang(section)} tiếng
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
                        <Text>NO DATA</Text>
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
                                    ngày làm thêm
                                </Text>
                                <Text style={styles.leaveDate}>
                                    {`${moment(item?.Check_Day).format(
                                        "DD/MM/YYYY",
                                    )}`}
                                </Text>
                                <Text>{item.Overtime} tiếng</Text>
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
        for (let i = 2000; i <= new Date().getFullYear(); i++) {
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

            if (index == -1) {
                arr.push(moment(element?.Check_Day).format("MM"));
            }
        });
        return arr.sort();
    };
    return (
        <>
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                <View style={styles.summary}>
                    <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}>
                            <Text style={styles.textTitle}>
                                Chi tiết làm thêm giờ {selectYear}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.titleText}>
                                        Làm thêm tối đa
                                    </Text>
                                    <Text style={styles.contentText}>
                                        300 giờ
                                    </Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.titleText}>
                                        Số ngày tăng ca
                                    </Text>
                                    <Text style={styles.contentText}>
                                        {listOverTime?.length}
                                    </Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.titleText}>
                                        Số giờ tăng ca
                                    </Text>
                                    <Text style={styles.contentText}>
                                        {tongNgay()} giờ
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{ height: "80%" }}>
                    {listOverTime.length != 0 ? (
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
                            <Text style={{ color: "black" }}>No data</Text>
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
                            <ScrollView style={{ height: 300, width: "100%" }}>
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
    font: {
        fontFamily: "Monda",
    },
    titleSalaryDetail: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: "900",
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
        fontWeight: "900",
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
        fontWeight: "300",
        fontSize: 19,
        marginBottom: 10,
    },
    contentText: {
        textAlign: "center",
        color: "white",
        fontWeight: "900",
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
