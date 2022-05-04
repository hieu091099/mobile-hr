import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";
import Anticons from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../config";
import { getOnLeave } from "../../redux/actions/UserAction";
import moment from "moment";
import DatePicker from "react-native-modern-datepicker";
export default function OnLeave() {
    const [activeSections, setActiveSections] = useState([]);

    const { listOnLeave } = useSelector((state) => state.UserReducer);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectDate, setSelectDate] = useState(
        new Date().getFullYear() + " " + new Date().getMonth(),
    );
    const dispatch = useDispatch();
    // console.log(listOnLeave);
    useEffect(() => {
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then((res) => {
                    //   console.log(res);
                    dispatch(getOnLeave(res, personId, "2022"));
                });
            }
        });
    }, []);
    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };
    const renderTypeLeave = (item) => {
        let arrP = item.split(" ");
        let arrColor = [
            {
                type: "P",
                backgroundColor: "#B5F7D1",
                color: "#4E944F",
            },
            {
                type: "RO",
                backgroundColor: "#FFEFED",
                color: "#B20600",
            },
        ];
        let objectColor = {
            backgroundColor: "#FDEFC5",
            color: "#C09E44",
        };
        arrColor.map((value) => {
            if (value.type === arrP[0]) {
                objectColor = value;
            }
        });
        return (
            <Text
                style={{
                    backgroundColor: objectColor.backgroundColor,
                    paddingHorizontal: 5,
                    alignSelf: "center",
                    borderRadius: 4,
                    color: objectColor.color,
                    fontWeight: "bold",
                }}>
                {arrP[0]}
            </Text>
        );
    };
    const renderHeaderMonth = (section, _, isActive) => {
        //Accordion Header view
        return (
            <View
                style={{
                    backgroundColor: "red",
                    height: 55,
                    alignItems: "center",
                    backgroundColor: isActive ? "#0D4A85" : "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <Text
                    style={[
                        styles.font,
                        {
                            color: isActive ? "white" : "#0D4A85",
                            fontWeight: "bold",
                            fontSize: 15,
                            paddingLeft: 20,
                        },
                    ]}>
                    Tháng {section}
                </Text>
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
        let data = listOnLeave.filter(v=>{return moment(v?.Vacation_From_Date).format("MM") == section});
        if(data.length == 0){
            return (
                <View style={styles.leaveItem} >
                        <View style={{width:'100%',alignItems:'center'}}><Text>NO DATA</Text></View>
                    </View>
            );
         }else{    
        return data.map((item, index) => {
            if (moment(item?.Vacation_From_Date).format("MM") == section) {
                return (
                    <View style={styles.leaveItem} key={index}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.leaveTitle} numberOfLines={1}>
                                {item.Vacation_ID}
                            </Text>
                            <Text style={styles.leaveDate}>
                               
                                {`${moment(item?.Vacation_From_Date).format(
                                    "DD/MM/YYYY",
                                )}`}
                                {item.Vacation_From_Date !=
                                item.Vacation_To_Date
                                    ? `  ${moment(
                                          item?.Vacation_To_Date,
                                      ).format("DD/MM/YYYY")}`
                                    : ""}
                            </Text>
                            <Text>
                               
                                {item.Vacation_Detail_Note}
                            </Text>
                        </View>
                        <View style={{ maxWidth: "30%" }}>
                            {renderTypeLeave(item.Vacation_ID)}
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

    return (
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            {/* <Text style={styles.titleSalaryDetail}>Ngày Phép Năm <TouchableOpacity onPress={()=>{setModalVisible(true)}}><Text>2022</Text></TouchableOpacity></Text> */}
            <View style={styles.summary}>
                <View style={{ marginLeft: 10 }}>
                   
                        <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
                        <Text style={styles.textTitle}>
                        Tổng phép năm 2022
                        </Text>
                        </TouchableOpacity>
                        {/* <Text
                                    onStartShouldSetResponder={() =>
                                        setModalVisible(true)
                                    }
                                    style={{
                                        textDecorationLine: "underline",
                                        color: "white",
                                    }}>
                                </Text> */}
                    {/* </Text> */}
                </View>
                <View>
                    <View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.titleText}>Tổng phép</Text>
                                <Text style={styles.contentText}>15</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.titleText}>Đã nghỉ</Text>
                                <Text style={styles.contentText}>2</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.titleText}>Còn lại</Text>
                                <Text style={styles.contentText}>13</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={{ height:'80%' }}>
                <Accordion
                    activeSections={activeSections}
                    sections={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader={renderHeaderMonth}
                    renderContent={renderContentMonth}
                    duration={400}
                    onChange={setSections}
                />
            </ScrollView>
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
        </View>
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
});
