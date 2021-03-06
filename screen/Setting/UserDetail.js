import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    TextInput,
    RefreshControl,
    KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

export default function UserDetail({ navigation }) {
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
    const inputBirthDay = useRef();
    const inputPhone = useRef();
    const inputCard = useRef();
    const inputCardDate = useRef();

    const [isShowUpdate, setIsShowUpdate] = useState(false);
    const compare = (a, b) => {
        //a is value want to update, b is default value
        if (
            a.phone == b.mobilePhoneNumber &&
            a.birthday == moment(b.birthday).format("DD/MM/YYYY") &&
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
        const unsubscribe = navigation.addListener("focus", () => {
            setIsShowUpdate(false);
            setShowInput(true);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
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
                        birthday: moment(result.data.userInfo.birthday).format(
                            "DD/MM/YYYY",
                        ),
                        phone: result.data.userInfo.mobilePhoneNumber,
                        idCard: result.data.userInfo.ID,
                        idDate: moment(result.data.userInfo.ID_Day).format(
                            "DD/MM/YYYY",
                        ),
                    });
                    setIsShowUpdate(false);
                    setLoading(false);
                });
            }
        });
    }, [visible]);
    return (
        // <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={styles.container}
    //   >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1,
                position: "relative",
                backgroundColor: "white",
                justifyContent: "space-between",
            }}>
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
                                editable={!showInput}
                                value={update?.birthday}
                                onChangeText={(masked, unmasked) => {
                                    console.log(masked);
                                    setUpdate({ ...update, birthday: masked });
                                }}
                                mask={Masks.DATE_DDMMYYYY}
                                secureTextEntry={showInput}
                                ref={inputBirthDay}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather
                                name="edit-2"
                                size={16}
                                color="#0D4A85"
                                onPress={() => {
                                    inputBirthDay.current.focus();
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].soDienThoai}
                            </Text>
                            <TextInput
                                style={styles.infoContent}
                                editable={!showInput}
                                onChangeText={(value) => {
                                    setUpdate({ ...update, phone: value });
                                }}
                                keyboardType="numeric"
                                value={update?.phone}
                                secureTextEntry={showInput}
                                ref={inputPhone}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85"  onPress={() => {
                                    inputPhone.current.focus();
                                }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxInfoItem}>
                        <View style={styles.boxInfoRow}>
                            <Text style={styles.infoTitle}>
                                {multilang[lang].chungMinhNhanDan}
                            </Text>
                            <TextInput
                                style={styles.infoContent}
                                editable={!showInput}
                                onChangeText={(value) => {
                                    setUpdate({ ...update, idCard: value });
                                }}
                                keyboardType="numeric"
                                value={update?.idCard}
                                secureTextEntry={showInput}
                                ref={inputCard}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85"  onPress={() => {
                                    inputCard.current.focus();
                                }}/>
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
                                editable={!showInput}
                                onChangeText={(masked, unmasked) => {
                                    console.log(masked);
                                    setUpdate({ ...update, idDate: masked });
                                }}
                                secureTextEntry={showInput}
                                mask={Masks.DATE_DDMMYYYY}
                                ref={inputCardDate}
                            />
                        </View>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#0D4A85" onPress={() => {
                                    inputCardDate.current.focus();
                                }}/>
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
                </View>
            </ScrollView>
            {isShowUpdate ? (
                <View style={{ padding: 10 }}>
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
                </View>
            ) : (
                <></>
            )}
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
        {/* </View> */}
       </KeyboardAvoidingView>
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
        // width: "80%",
        height: 50,
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
