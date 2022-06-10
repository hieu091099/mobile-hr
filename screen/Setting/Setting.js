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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { axiosInstanceToken, getToken } from "../../config";
import { multilang } from "../../language/multilang";

export default function Setting() {
    const [infoUser, setInfoUser] = useState();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { lang } = useSelector((state) => state.UserReducer);
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
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginTop: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: "white",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            paddingVertical: 30,
                            borderRadius: 8,
                        }}>
                        <View
                            style={{
                                backgroundColor: "#0D4A85",
                                padding: 10,
                                borderRadius: 50,
                                marginLeft: 10,
                                marginRight: 20,
                                maxHeight: 70,
                            }}>
                            <Feather name="user" size={40} color="white" />
                        </View>
                        <View style={{ width: "80%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                {infoUser?.Person_Name}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {infoUser?.Department_Name}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {multilang[lang].ngayVaoCongTy} :{" "}
                                {moment(infoUser?.Date_Come_In).format(
                                    "DD-MM-YYYY",
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.boxMenu}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    color: "#476072",
                                }}>
                                {multilang[lang].thongTin}
                            </Text>
                        </View>
                        <View
                            style={[styles.menuItem, { borderBottomWidth: 0 }]}
                            onStartShouldSetResponder={() => {
                                navigation.navigate("UserDetail");
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                <Feather name="info" size={15} />
                                <Text style={styles.textMenu}>
                                    {multilang[lang].thongTinCaNhan}
                                </Text>
                            </View>

                            <Text>
                                <AntIcon
                                    color={"black"}
                                    name="right"
                                    size={15}
                                />
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                    <View style={styles.boxMenu}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    color: "#476072",
                                }}>
                                {multilang[lang].caiDat}
                            </Text>
                        </View>
                        <View
                            style={styles.menuItem}
                            onStartShouldSetResponder={() => {
                                navigation.navigate("ChangeLanguage");
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                <FontAwesome name="language" size={15} />
                                <Text style={styles.textMenu}>
                                    {multilang[lang].thayDoiNgonNgu}
                                </Text>
                            </View>

                            <View>
                                <AntIcon
                                    color={"black"}
                                    name="right"
                                    size={15}
                                />
                            </View>
                        </View>

                        <View
                            style={[styles.menuItem, { borderBottomWidth: 0 }]}
                            onStartShouldSetResponder={() => {
                                navigation.navigate("ChangePassword");
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                <FontAwesome name="refresh" size={15} />
                                <Text style={styles.textMenu}>
                                    {multilang[lang].doiMatKhau}
                                </Text>
                            </View>

                            <View>
                                <AntIcon
                                    color={"black"}
                                    name="right"
                                    size={15}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity
                        style={styles.btndx}
                        onPress={() => {
                            dispatch({
                                type: "LOGOUT",
                            });
                        }}>
                        <Text style={styles.textbtndx}>
                            {multilang[lang].dangXuat}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    boxus: {
        backgroundColor: "white",
        width: "100%",
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 8,
    },
    chuaBox: {
        flex: 1,
    },
    boxMenu: {
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 8,
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
        marginLeft: 20,
    },
    btndx: {
        backgroundColor: "white",
        marginTop: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
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
        fontWeight: "600",
    },
});
