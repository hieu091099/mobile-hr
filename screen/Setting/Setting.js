import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { axiosInstanceToken, getToken } from "../../config";
import { multilang } from "../../language/multilang";

export default function Setting() {
    const [infoUser, setInfoUser] = useState();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { lang } =
        useSelector((state) => state.UserReducer);
    useEffect(() => {
        // http://192.168.18.172:8000/user/getUserInfo/29975
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                res = JSON.parse(res);
                let personId = res.userId;
                getToken("accessToken").then(async (res) => {
                    let result = await axiosInstanceToken(
                        "GET",
                        `user/getUserInfo/${personId}`,
                        res,
                    );
                    setInfoUser(result?.data?.userInfo);
                });
            }
        });
    }, []);

    return (
        <View style={{ backgroundColor: "#F4F4F4", flex: 1 }}>
            <ScrollView style={styles.chuaBox}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("UserDetail");
                    }}>
                    <View style={styles.boxus}>
                        <View style={styles.boxusleft}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "black",
                                }}>
                                {infoUser?.Person_Name}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                {infoUser?.Department_Name}
                            </Text>
                            <Text>
                                Ngày vào :{" "}
                                {moment(infoUser?.Date_Come_In).format(
                                    "DD-MM-YYYY",
                                )}
                            </Text>
                        </View>
                        <View style={styles.boxusright}>
                            <AntIcon color={"black"} name="right" size={25} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.boxMenu}>
                    <View
                        style={styles.menuItem}
                        onStartShouldSetResponder={() => {
                            Linking.openURL(`tel:123456`);
                        }}>
                        <Text style={styles.textMenu}>
                        {multilang[lang].duongDayNong} :{" "}
                            <Text style={{ color: "#0D4A85" }}>099999999</Text>{" "}
                        </Text>
                        <Text>
                            <AntIcon color={"black"} name="right" size={15} />
                        </Text>
                    </View>
                    <View
                        style={styles.menuItem}
                        onStartShouldSetResponder={() => {
                            Linking.openURL(`mailto:trungnamdev@gmail.com`);
                        }}>
                        <Text style={styles.textMenu}>
                            Email :{" "}
                            <Text style={{ color: "#0D4A85" }}>
                                lacty.company.com.vn
                            </Text>{" "}
                        </Text>
                        <Text>
                            <AntIcon color={"black"} name="right" size={15} />
                        </Text>
                    </View>
                    <View
                        style={styles.menuItem}
                        onStartShouldSetResponder={() => {
                            navigation.navigate("ChangeLanguage");
                        }}>
                        <Text style={styles.textMenu}>{multilang[lang].thayDoiNgonNgu} </Text>
                        <Text>
                            <AntIcon color={"black"} name="right" size={15} />
                        </Text>
                    </View>
                    <View
                        style={[styles.menuItem, { borderBottomWidth: 0 }]}
                        onStartShouldSetResponder={() => {
                            navigation.navigate("ChangePassword");
                        }}>
                        <Text style={styles.textMenu}>{multilang[lang].doiMatKhau} </Text>
                        <Text>
                            <AntIcon color={"black"} name="right" size={15} />
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.btndx}
                    onPress={() => {
                        dispatch({
                            type: "LOGOUT",
                        });
                    }}>
                    <Text style={styles.textbtndx}>{multilang[lang].dangXuat}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    boxus: {
        backgroundColor: "white",
        width: "100%",
        height: 100,
        marginTop: 5,
        marginBottom: 10,
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    chuaBox: {
        flex: 1,
    },
    boxMenu: {
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    menuItem: {
        width: "100%",
        height: 50,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#EBEBEB",
    },
    textMenu: {
        fontWeight: "700",
    },
    btndx: {
        backgroundColor: "white",
        marginTop: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    textbtndx: {
        color: "#0D4A85",
        fontWeight: "700",
        fontSize: 15,
    },
    boxusleft: {
        width: "90%",
        height: "100%",
        justifyContent: "space-evenly",
    },
    boxusright: {
        width: "10%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        color: "black",
        marginTop: 30,
        marginBottom: 50,
        fontWeight: "900",
    },
});
