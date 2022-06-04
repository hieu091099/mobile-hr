import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstanceToken, getToken } from "../../config";
import DialogNavigate from "../../components/SimpleDialog/DialogNavigate";
import SimpleDialog from "../../components/SimpleDialog/SimpleDialog";
import { multilang } from "../../language/multilang";

export default function ChangePassword() {
    const dispatch = useDispatch();
    const { lang } = useSelector(
        (state) => state.UserReducer,
    );
    const navigation = useNavigation();
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPassCf, setNewPassCf] = useState("");
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [onLoad, setOnLoad] = useState(false);

    const [msgChangePass, setMsgChangePass] = useState();

    const changePassword = async () => {
        if (
            oldPass != "" &&
            newPass != "" &&
            newPassCf != "" &&
            newPass == newPassCf
        ) {
            try {
                setOnLoad(true);
                getToken("user").then((res) => {
                    if (res != "" || res != undefined) {
                        res = JSON.parse(res);
                        // console.log(res);
                        let personId = res.userId;
                        let factory = res.factory;
                        getToken("accessToken").then(async (res) => {
                            let result = await axiosInstanceToken(
                                "POST",
                                `user/changePassword/`,
                                res,
                                {
                                    userId: personId,
                                    factory: factory,
                                    password: oldPass,
                                    newPassword: newPass,
                                },
                            );
                            setOnLoad(false);
                            setMsgChangePass(result.data);
                            // console.log(result.data);

                            if (result.data.status == true) {
                                navigation.navigate("SuccessChangePass");
                            } else {
                                setVisibleMsg(true);
                            }
                        });
                    }
                });

                // }
            } catch (e) {
                // console.log(e);
            }
        } else {
            if (newPass != newPassCf) {
                setMsgChangePass({ message: "matKhauXacNhanKhongKhop"});
                setVisibleMsg(true);
            } else {
                setMsgChangePass({ message: "vuiLongNhapDayDuThongTin" });
                setVisibleMsg(true);
            }
        }
    };
    return (
        <ImageBackground
            source={require("../../assets/images/bg_login2.png")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}>
            <SimpleDialog
                visible={visibleMsg}
                setVisible={setVisibleMsg}
                message={multilang[lang][msgChangePass?.message]}
            />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                <Text style={styles.title}>{multilang[lang].doiMatKhau}</Text>

                <TextInput
                    secureTextEntry={true}
                    label={multilang[lang].matKhauHienTai}
                    mode="outlined"
                    value={oldPass}
                    onChangeText={setOldPass}
                    style={styles.input}
                />

                <TextInput
                    secureTextEntry={true}
                    label={multilang[lang].matKhauMoi}
                    mode="outlined"
                    value={newPass}
                    onChangeText={setNewPass}
                    style={styles.input}
                />

                <TextInput
                    secureTextEntry={true}
                    label={multilang[lang].nhapLaiMatKhauMoi}
                    mode="outlined"
                    value={newPassCf}
                    onChangeText={setNewPassCf}
                    style={styles.input}
                />
                <View
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <View style={styles.btn}>
                        <Text
                            style={styles.textBtn}
                            onStartShouldSetResponder={() => {
                                changePassword();
                            }}>
                          {multilang[lang].doiMatKhau}
                        </Text>
                    </View>
                </View>
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    // input: {
    //     backgroundColor: "white",
    //     borderBottomWidth: 2,
    //     borderBottomColor: "#D5D5D5",
    //     height: 40,
    //     marginBottom: 30,
    //     color: "black",
    //     fontWeight: "bold",
    //     fontSize: 20,
    // },
    label: {
        color: "#7F7F7F",
    },
    title: {
        fontSize: 30,
        color: "black",
        marginTop: 30,
        marginBottom: 50,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "white",
        borderRadius: 10,
    },
    btn: {
        backgroundColor: "#0D4A85",
        width: "100%",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 20,

        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textBtn: {
        color: "white",
        fontSize: 18,
    },
});
