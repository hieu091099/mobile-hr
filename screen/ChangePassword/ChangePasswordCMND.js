import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    Linking,
} from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import MaskInput, { Masks } from "react-native-mask-input";
import SimpleDialog from "../../components/SimpleDialog/SimpleDialog";
import { axiosInstance } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { multilang } from "../../language/multilang";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
export default function ChangePasswordCMND() {
    const [soThe, setsoThe] = useState("");
    const [cmnd, setCmnd] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [datetimebd, setdatetimebd] = useState("");
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [messDialog, setMessDialog] = useState("");
    const [onLoad, setOnLoad] = useState(false);
    const { lang } = useSelector((state) => state.UserReducer);

    const [showPassW, setShowPassW] = useState(true);

    const navigation = useNavigation();

    return (
        <>
            <ImageBackground
                source={require("../../assets/images/bg_login2.png")}
                resizeMode="cover"
                style={{
                    flex: 1,
                    position: "relative",
                    paddingHorizontal: 20,
                    alignItems: "center",
                }}>
                <SimpleDialog
                    visible={visibleDialog}
                    setVisible={setVisibleDialog}
                    message={multilang[lang][messDialog]}
                />
                <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/images/logo_login.jpg")}
                />
                <View style={styles.tieude}>
                    <Text style={[styles.td]}>
                        {multilang[lang].quenMatKhau}
                    </Text>
                </View>
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={soThe}
                    label={multilang[lang].soThe}
                    mode="outlined"
                    placeholder={multilang[lang].soThe}
                    style={[styles.inputlogin, { marginTop: 10 }]}
                    onChangeText={(val) => {
                        setsoThe(val);
                    }}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={cmnd}
                    label={multilang[lang].chungMinhNhanDan}
                    mode="outlined"
                    placeholder={multilang[lang].chungMinhNhanDan}
                    style={[styles.inputlogin]}
                    onChangeText={(val) => {
                        setCmnd(val);
                    }}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    mode="outlined"
                    style={[styles.inputlogin]}
                    render={(props) => (
                        <MaskInput
                            keyboardType="numeric"
                            value={datetimebd}
                            onChangeText={(masked, unmasked) => {
                                // you can use the unmasked value as well
                                //// console.log(masked);
                                setdatetimebd(masked);
                            }}
                            mask={Masks.DATE_DDMMYYYY}
                            placeholder={multilang[lang].ngaySinh}
                            placeholderTextColor="gray"
                            style={{
                                width: "100%",
                                height: 55,
                                paddingLeft: 15,
                                fontSize: 15,
                            }}
                        />
                    )}
                />
                <TextInput
                    theme={{
                        colors: {
                            primary: "#0D4A85",
                            underlineColor: "transparent",
                        },
                    }}
                    value={matKhau}
                    label={multilang[lang].matKhauMoi}
                    mode="outlined"
                    secureTextEntry={showPassW}
                    placeholder={multilang[lang].matKhauMoi}
                    style={[styles.inputlogin]}
                    right={
                        <TextInput.Icon
                            name={showPassW ? "eye" : "eye-off"}
                            color={"#ccc"}
                            onPress={() => {
                                setShowPassW(!showPassW);
                            }}
                        />
                    }
                    onChangeText={(val) => {
                        setMatKhau(val);
                        // setUserLogin({ ...userLogin, password: val });
                    }}
                />
                <TouchableOpacity
                    style={[styles.btndn, { width: "100%", borderRadius: 5 }]}
                    onPress={async () => {
                        setOnLoad(true);
                        if (
                            soThe.trim() != "" &&
                            cmnd.trim() != "" &&
                            datetimebd.trim() != "" &&
                            datetimebd.length == 10 &&
                            matKhau.trim() != ""
                        ) {
                            // 09-10-1999
                            // console.log(datetimebd.split("/")[0]);
                            let datesplit = datetimebd.split("/");
                            let result = await axiosInstance.post(
                                `user/forgetPassword/`,
                                {
                                    userId: soThe,
                                    birthday:
                                        datesplit[2] +
                                        "-" +
                                        datesplit[1] +
                                        "-" +
                                        datesplit[0],
                                    idCard: cmnd,
                                    newPassword: matKhau,
                                },
                            );
                            setOnLoad(false);
                            // console.log(result.data);
                            if (result?.status == 200) {
                                if (result.data?.status) {
                                    setMessDialog(result.data?.message);
                                    setVisibleDialog(true);
                                    setsoThe("");
                                    setCmnd("");
                                    setdatetimebd("");
                                    setMatKhau("");
                                } else {
                                    setMessDialog(result.data?.message);
                                    setVisibleDialog(true);
                                }
                            } else {
                                setMessDialog("loiChuaXacDinh");
                                setVisibleDialog(true);
                            }

                            // if(result.data.status == true){
                            //         navigation.navigate("SuccessChangePass");
                            // }else{
                            //     setVisibleMsg(true);
                            // }
                            setOnLoad(false);
                        } else {
                            setOnLoad(false);
                            setMessDialog("vuiLongNhapDayDuThongTin");
                            setVisibleDialog(true);
                        }
                        // navigation.navigate("SuccessChangePass");
                    }}>
                    <Text style={styles.textbtndn}>
                        {multilang[lang].doiMatKhau}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                    style={{ width: "100%" }}>
                    <Text
                        style={{
                            color: "gray",
                            marginTop: 10,
                            textDecorationLine: "underline",
                            textDecorationColor: "#0D4A85",
                        }}>
                        {multilang[lang].dangNhap} ?
                    </Text>
                </TouchableOpacity>
                <View style={styles.contact}>
                    <View style={styles.contactItem}>
                        <Icon
                            name="phone"
                            type="entypo"
                            color="#517fa4"
                            size={20}
                        />
                        <Text style={styles.contactText}>Số nội bộ IT : 135</Text>
                    </View>
                    <View style={styles.contactItem}
                    onStartShouldSetResponder={() => {
                        Linking.openURL(
                            `tel:0902590113`,
                        );
                    }}
                    >
                        <Icon
                               name="old-phone"
                            type="entypo"
                            color="#517fa4"
                            size={20}
                        />
                        <Text style={styles.contactText}>
                          090.259.0113 ( Nhân sự )
                        </Text>
                    </View>
                </View>
            </ImageBackground>
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
    inputlogin: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
    },
    btndn: {
        marginTop: 10,
        width: "80%",
        height: 55,
        backgroundColor: "#0D4A85",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    textbtndn: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
    },
    tinyLogo: {
        width: 80,
        height: 80,
        marginTop: 50,
    },
    tieude: {
        width: "100%",
        paddingHorizontal: 20,
        // height: 200,
        justifyContent: "flex-end",
        textAlign: "center",
    },
    td: {
        color: "#2D5881",
        fontSize: 30,
        fontWeight: "600",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 30,
    },
    contact: {
        marginTop: 60,
        alignItems: "center",
    },
    contactItem: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    contactText: {
        marginLeft: 10,
        color: "#0D4A85",
        fontWeight: "600",
    },
});
