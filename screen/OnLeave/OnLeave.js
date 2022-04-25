import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";
import DatePicker from "react-native-modern-datepicker";
import { Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import { getToken } from "../../config";
import { getOnLeave } from "../../redux/actions/UserAction";
import moment from "moment";
import { Tab, Text, TabView } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function OnLeave() {
    const [activeSections, setActiveSections] = useState([]);
    const { listOnLeave, setShowYearPicker } = useSelector(
        (state) => state.UserReducer,
    );
    const [date, setDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [focusMonth, setFocusMonth] = useState(0);
    const dispatch = useDispatch();
    const [selectDate, setSelectDate] = useState(
        new Date().getFullYear() + " " + new Date().getMonth(),
    );
    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then((res) => {
                    dispatch(getOnLeave(res, personId, `2021`));
                });
            }
        });
    }, [focusMonth]);
    const [index, setIndex] = React.useState(0);
    const render = (item) => {
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#084594",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                }}>
                <Text style={{ fontSize: 18, color: "white" }}>
                    Tháng {item.item}
                    {/* {item.item == 0 ? "Tất cả" : `Tháng ${item.item}`} */}
                </Text>
            </View>
        );
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
                    borderRadius: 4,
                    color: objectColor.color,
                    fontWeight: "bold",
                }}>
                {item}
            </Text>
        );
    };
    return (
        <View style={styles.container}>
            {/* <Carousel
                layout={"default"}
                data={[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                ]}
                sliderWidth={windowWidth}
                loop={true}
                itemWidth={120}
                renderItem={render}
                onSnapToItem={(index) => setFocusMonth(index + 1)}
            /> */}
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: "white",
                    height: 3,
                }}
                variant="primary"
                containerStyle={{ backgroundColor: "#0D4A85" }}>
                <Tab.Item
                    title="Tất Cả"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "timer", type: "ionicon", color: "white" }}
                />
                <Tab.Item
                    title="P"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "heart", type: "ionicon", color: "white" }}
                />
                <Tab.Item
                    title="RO"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "cart", type: "ionicon", color: "white" }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                    }}>
                    <ScrollView style={styles.leaveContainer}>
                        {listOnLeave?.length == 0 ? (
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
                        ) : (
                            listOnLeave?.map((item, index) => {
                                return (
                                    <View style={styles.leaveItem} key={index}>
                                        <View>
                                            <Text
                                                style={styles.leaveTitle}
                                                numberOfLines={1}
                                                ellipsizeMode="end">
                                                {item.Vacation_ID}
                                            </Text>
                                            <Text style={styles.leaveDate}>
                                                Web, 16 Dec
                                            </Text>
                                            <Text>
                                                {item.Vacation_Detail_Note}
                                            </Text>
                                        </View>
                                        <View>
                                            {/* <View>
                                                <Text style={styles.leaveNote}>
                                                    Awaiting
                                                </Text>
                                            </View> */}
                                            {renderTypeLeave(item.Vacation_ID)}
                                            <View>
                                                <Ionicons
                                                    name="podium-outline"
                                                    size={26}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </ScrollView>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: "white", width: "100%" }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: "white", width: "100%" }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>

            {/* <DataTable style={{ marginTop: 10 }}>
                <DataTable.Header style={{ backgroundColor: "#FCF9FC" }}>
                    <DataTable.Title style={{ flex: 2 }}>Ngày</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                        Loại nghỉ
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>
                        Giờ nghỉ
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                        Ghi chú
                    </DataTable.Title>
                </DataTable.Header>
                <ScrollView style={{ height: "85%" }}>
                    {listOnLeave?.length == 0 ? (
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
                    ) : (
                        listOnLeave?.map((value, index, array) => {
                            return (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell
                                        style={{ flex: 2, paddingVertical: 5 }}>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                backgroundColor: "#F7F7F7",
                                                borderColor: "#F2F2F2",
                                                borderRadius: 6,
                                                padding: 10,
                                                alignItems: "center",
                                            }}>
                                            <Text
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 18,
                                                }}>
                                                {moment(
                                                    value?.Vacation_From_Date,
                                                ).format("DD")}
                                            </Text>
                                            <Text>
                                                T
                                                {moment(
                                                    value?.Vacation_From_Date,
                                                ).format("MM")}
                                            </Text>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        style={{
                                            flex: 3,
                                        }}>
                                        {renderTypeLeave(value?.Vacation_ID)}
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 2 }}>
                                        {value?.Vacation_Hour == 0
                                            ? value?.Vacation_Day + " ngày"
                                            : Math.round(value?.Vacation_Hour) +
                                              " tiếng"}
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 3 }}>
                                        {value?.Vacation_Detail_Note}{" "}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            );
                        })
                    )}
                </ScrollView>
            </DataTable>
             */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        paddingTop: 20,
    },
    leaveContainer: {
        padding: 10,
    },
    leaveItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    leaveTitle: {
        color: "gray",
        fontWeight: "bold",
    },
    leaveDate: {
        fontSize: 24,
        fontWeight: "bold",
    },
    leaveNote: {},
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
});
