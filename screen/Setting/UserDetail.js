import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    TextInput,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import SvgQRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
// import { TextInput } from "react-native-paper";
import { axiosInstanceToken, getToken } from "../../config";
import AweIcon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { multilang } from "../../language/multilang";
import Feather from "react-native-vector-icons/Feather";
import MaskInput, { Masks } from "react-native-mask-input";
import SimpleDialog from "../../components/SimpleDialog/SimpleDialog";

export default function UserDetail() {
    const [zoomQr, setZoomQr] = useState(false);
    const { user, lang } = useSelector((state) => state.UserReducer);
    const [infoUser, setInfoUser] = useState();
    const [showInput, setShowInput] = useState(true);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [update, setUpdate] = useState({
        birthday: "",
        phone: "",
        idCard: "",
        idDate: "",
    });
    const [isShowUpdate, setIsShowUpdate] = useState(false);
    const compare = (a, b) => {
        //a is value want to update, b is default value
        if (
            a.phone == b.Mobilephone_Number &&
            a.birthday == moment(b.Birthday).format("DD/MM/YYYY") &&
            a.idCard == b.ID &&
            a.idDate == moment(b.ID_Day).format("DD/MM/YYYY")
        ) {
            return true;
        } else {
            return false;
        }
    };

    const updateInfo = () => {
        let user = update;
        user = { ...user, userId: infoUser.Person_ID };
        console.log({ user });
        getToken("accessToken").then(async (res) => {
            let result = await axiosInstanceToken(
                "PUT",
                `user/updateUserInfo`,
                res,
                { user },
            );
            if (result.data.status == 200) {
                setMessage(result.data.message);
                setVisible(true);
            } else {
                setMessage(result.data.message);
                setVisible(true);
            }
        });
    };

    useEffect(() => {
        if (infoUser && update) {
            if (!compare(update, infoUser)) {
                setIsShowUpdate(true);
            } else {
                setIsShowUpdate(false);
            }
        }
    }, [update]);
    useEffect(() => {
        setLoading(true);
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
                    setUpdate({
                        birthday: moment(result.data.userInfo.Birthday).format(
                            "DD/MM/YYYY",
                        ),
                        phone: result.data.userInfo.Mobilephone_Number,
                        idCard: result.data.userInfo.ID,
                        idDate: moment(result.data.userInfo.ID_Day).format(
                            "DD/MM/YYYY",
                        ),
                    });
                    setLoading(false);
                });
            }
        });
    }, [visible]);
    return (
        <View
            style={{ flex: 1, position: "relative", backgroundColor: "white" }}>
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{ alignItems: "center" }}
                refreshControl={<RefreshControl refreshing={loading} />}>
                <SimpleDialog
                    visible={visible}
                    setVisible={setVisible}
                    message={multilang[lang][message]}
                />
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

                <View style={styles.boxInfo}>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].hoVaTen}
                            </Text>
                            <Text style={styles.infoContent}>
                                {infoUser?.Person_Name}
                            </Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Feather name="edit-2" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].soThe}
                            </Text>
                            <Text style={styles.infoContent}>
                                {infoUser?.Person_ID}
                            </Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Feather name="edit-2" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].donVi}
                            </Text>
                            <Text style={styles.infoContent}>
                                {infoUser?.Department_Name}
                            </Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Feather name="edit-2" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].ngayVaoCongTy}
                            </Text>
                            <Text style={styles.infoContent}>
                                {moment(infoUser?.Date_Come_In).format(
                                    "DD/MM/YYYY",
                                )}
                            </Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Feather name="edit-2" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].ngaySinh}
                            </Text>
                            <MaskInput
                                style={styles.infoContent}
                                keyboardType="numeric"
                                value={update?.birthday}
                                onChangeText={(masked, unmasked) => {
                                    console.log(masked);
                                    setUpdate({ ...update, birthday: masked });
                                }}
                                mask={Masks.DATE_DDMMYYYY}
                                secureTextEntry={showInput}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].soDienThoai}
                            </Text>
                            <TextInput
                                style={styles.infoContent}
                                onChangeText={(value) => {
                                    setUpdate({ ...update, phone: value });
                                }}
                                keyboardType="numeric"
                                value={update?.phone}
                                secureTextEntry={showInput}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].chungMinhNhanDan}
                            </Text>
                            <TextInput
                                style={styles.infoContent}
                                onChangeText={(value) => {
                                    setUpdate({ ...update, idCard: value });
                                }}
                                keyboardType="numeric"
                                value={update?.idCard}
                                secureTextEntry={showInput}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].ngayCap}
                            </Text>

                            <MaskInput
                                style={styles.infoContent}
                                keyboardType="numeric"
                                value={update?.idDate}
                                onChangeText={(masked, unmasked) => {
                                    console.log(masked);
                                    setUpdate({ ...update, idDate: masked });
                                }}
                                secureTextEntry={showInput}
                                mask={Masks.DATE_DDMMYYYY}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].diaChi}
                            </Text>
                            <Text style={styles.infoContent}>
                                {infoUser?.Staying_Address}
                            </Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Feather name="edit-2" />
                        </TouchableOpacity> */}
                    </View>
                    {isShowUpdate ? (
                        <TouchableOpacity
                            onPress={() => updateInfo()}
                            style={[
                                styles.button,
                                { width: "100%", borderRadius: 5 },
                            ]}>
                            <Text style={styles.buttonText}>
                                {" "}
                                {multilang[lang].luuThayDoi}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
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
    boxInfo: {
        marginTop: 10,
        padding: 10,
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        borderTopWidth: 1,
        borderTopColor: "#EFEFEF",
    },
    boxInfoItem: {
        // width: "98%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EFEFEF",
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    boxInfoRow: {
        flexDirection: "row",
        width: "95%",
    },
    infoTitle: {
        width: "40%",
        marginRight: 10,
        color: "#73777B",
        fontWeight: "bold",
    },
    infoContent: {
        width: "50%",
        fontWeight: "bold",
    },
    button: {
        marginTop: 10,
        width: "80%",
        height: 55,
        backgroundColor: "#0D4A85",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 14,
        color: "white",
        fontWeight: "600",
        textTransform: "uppercase",
    },
});

//   "Date_Come_In": "2021-06-02T00:00:00.000Z",
//   "Department_Name": "VPCT",
//   "Person_ID": "30730",
