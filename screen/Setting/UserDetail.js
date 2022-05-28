import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import SvgQRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";
import { axiosInstanceToken, getToken } from "../../config";
import AweIcon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
export default function UserDetail() {
    const [zoomQr, setZoomQr] = useState(false);
    const { user } = useSelector((state) => state.UserReducer);
    const [infoUser, setInfoUser] = useState();
    const [showInput, setShowInput] = useState(true);

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
                    //// console.log(result?.data?.userInfo);
                    setInfoUser(result?.data?.userInfo);
                });
            }
        });
    }, []);
    return (
        <View
            style={{ flex: 1, position: "relative", backgroundColor: "white" }}>
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{ alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        setZoomQr(true);
                    }}>
                    <View style={styles.boxqr}>
                        <SvgQRCode
                            value={user.userId}
                            size={100}
                            backgroundColor="white"
                            color="#084594"
                        />
                    </View>
                </TouchableOpacity>

                <View>
                    <AweIcon
                        name={!showInput ? "eye-slash" : "eye"}
                        size={30}
                        color="#C2C2C2"
                        onPress={() => {
                            setShowInput(!showInput);
                        }}
                    />
                </View>
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={infoUser?.Department_Name}
                    label="Đơn vị"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={infoUser?.Person_ID}
                    label="Số thẻ"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={moment(infoUser?.Date_Come_In).format("DD/MM/YYYY")}
                    label="Ngày vào công ty"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={infoUser?.Person_Name}
                    label="Họ và tên"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={moment(infoUser?.Birthday).format("DD/MM/YYYY")}
                    label="Ngày sinh"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                    secureTextEntry={showInput}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={infoUser?.Mobilephone_Number}
                    label="Số điện thoại"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                    secureTextEntry={showInput}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={infoUser?.ID}
                    label="Chứng minh nhân dân"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                    secureTextEntry={showInput}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={infoUser?.Staying_Address}
                    label="Địa chỉ"
                    mode="outlined"
                    style={[styles.input]}
                    disabled={true}
                    numberOfLines={4}
                    multiline={true}
                    secureTextEntry={showInput}
                />
            </ScrollView>
            {zoomQr && (
                <Pressable
                    style={styles.zoomqr}
                    onPress={() => {
                        setZoomQr(false);
                    }}>
                    <View>
                        <SvgQRCode
                            value={user.userId}
                            size={290}
                            backgroundColor="white"
                            color="#084594"
                        />
                    </View>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    boxqr: {
        backgroundColor: "white",
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    zoomqr: {
        flex: 1,
        position: "absolute",
        backgroundColor: "#000000b3",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "90%",
        marginVertical: 8,
    },
});

//   "Date_Come_In": "2021-06-02T00:00:00.000Z",
//   "Department_Name": "VPCT",
//   "Person_ID": "30730",
