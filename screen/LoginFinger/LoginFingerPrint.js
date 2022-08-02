import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as LocalAuthentication from "expo-local-authentication";
import { Provider as PaperProvider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginFingerAction } from "../../redux/actions/UserAction";
import { useNavigation } from "@react-navigation/native";
import { deleteToken, getToken, setToken, getExpoPushNoti } from "../../config";
import { Icon } from "react-native-elements";
import SimpleDialog from "../../components/SimpleDialog/SimpleDialog";
import { multilang } from "../../language/multilang";
import * as Notifications from "expo-notifications";
export default function LoginFingerPrint() {
    const imglang = {
        vi: { img: require("../../assets/images/flags/vi.png"), name: "vi" },
        // mm: { img: require("../../assets/images/flags/mm.png"), name: "mm" },
        en: { img: require("../../assets/images/flags/en.png"), name: "en" },
        tw: { img: require("../../assets/images/flags/tw.png"), name: "tw" },
    };
    const [compatible, isCompatible] = useState(false);
    const [fingerPrints, setFingerPrints] = useState(false);
    const [showChooseLang, setShowChooseLang] = useState(false);
    const [showPassW, setShowPassW] = useState(true);

    /** state get userid from asyncstore */
    const [userIdFromDevice, setUserIdFromDevice] = useState("");
    const [factoryFromDevice, setFactoryFromDevice] = useState("");
    const [cancel, setCancel] = useState(false);
    /** global state get user info */
    const {
        isLoggedIn,
        isVisibleLogin,
        messageLoginResponse,
        lang,
        isLoadingLogin,
    } = useSelector((state) => state.UserReducer);
    /** state set when user type input */
    const [userLogin, setUserLogin] = useState({
        userId: "",
        password: "",
        factory: "",
    });

    /** state call dialog */
    const [isVisible, setIsVisible] = useState(false);
    /** state message dialog */
    const [dialogMessage, setDialogMessage] = useState("");
    const [isFaceID, setIsFaceID] = useState(2);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const changelang = (langinmenu) => {
        dispatch({
            type: "CHANGE_LANG",
            lang: langinmenu,
        });
        setToken("lang", langinmenu);
    };
    const setVisibleDispatch = () => {
        dispatch({
            type: "CLOSE_DIALOG_LOGIN",
        });
    };
    useEffect(() => {
        checkDeviceForHardware();
        checkForFingerprints();
        getToken("user").then((res) => {
            if (res != undefined) {
                let value = JSON.parse(res);
                setUserIdFromDevice(value.userId);
                setFactoryFromDevice(value.factory);
            }
        });
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("MainTab");
        }
        return () => {};
    }, [isLoggedIn]);
    const checkDeviceForHardware = async () => {
        let support =
            await LocalAuthentication.supportedAuthenticationTypesAsync();
        // console.log(support.length);
        if (support.length == 2) {
            setIsFaceID(0);
        }else{
            setIsFaceID(support[0]);
        }
        let compatible = await LocalAuthentication.hasHardwareAsync();
        isCompatible(compatible);
    };

    const checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        setFingerPrints(fingerprints);
    };

    const scanFingerprint = async () => {
        await LocalAuthentication.authenticateAsync().then((res) => {
            if (res.success) {
                let action = loginFingerAction(lang);
                dispatch(action);
            }
        });
    };

    const login = async () => {
        getExpoPushNoti().then((val) => {
            // console.log(factoryFromDevice);
            let action = loginAction(
                {
                    userId: userIdFromDevice,
                    password: userLogin.password,
                    factory: factoryFromDevice,
                    exponentPushToken: val,
                },
                navigation,
            );
            dispatch(action);
        });
    };
    const confirmWithCondition = () => {
        deleteToken("accessToken").then((res) => {
            deleteToken("user").then((ress) => {
                dispatch({
                    type: "LOGIN_ANOTHER_USERID",
                });
            });
        });
    };
    const loginWithAnotherUserId = () => {
        setIsVisible(true);
        setCancel(true);
        setDialogMessage(multilang[lang].banCoChacChanMuonDangNhapVoiSoTheKhac);
    };
    return (
        <PaperProvider>
            <SimpleDialog
                visible={isVisible}
                setVisible={setIsVisible}
                message={dialogMessage}
                cancel={cancel}
                confirmWithCondition={confirmWithCondition}
            />
            {/* dialog for login response error */}
            <SimpleDialog
                visible={isVisibleLogin}
                setVisible={setVisibleDispatch}
                message={multilang[lang][messageLoginResponse]}
            />
            <ImageBackground
                source={require("../../assets/images/bg_login2.png")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}>
                <TouchableOpacity
                    onPress={() => {
                        //// console.log("ok");
                        setShowChooseLang(!showChooseLang);
                    }}
                    style={{
                        flex: 1,
                        position: "absolute",
                        width: 35,
                        height: 35,
                        borderRadius: 50,
                        right: 20,
                        top: 20,
                        overflow: "hidden",
                    }}>
                    <Image
                        source={imglang[lang].img}
                        resizeMode="cover"
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                            overflow: "hidden",
                        }}
                    />
                </TouchableOpacity>
                {showChooseLang && (
                    <View
                        style={{
                            position: "absolute",
                            width: 50,
                            right: 17.5,
                            top: 60,
                            elevation: 10,
                            alignItems: "center",
                            paddingTop: 8,
                            zIndex: 2,
                            elevation: 10,
                        }}>
                        {Object.keys(imglang)?.map((value, index, array) => {
                            if (lang != value) {
                                return (
                                    <View
                                        key={index}
                                        onStartShouldSetResponder={() => {
                                            changelang(value);
                                            setShowChooseLang(false);
                                        }}>
                                        <Image
                                            style={{
                                                width: 35,
                                                height: 35,
                                                borderRadius: 100,
                                                marginBottom: 10,
                                            }}
                                            source={imglang[value].img}
                                            resizeMode="contain"
                                        />
                                    </View>
                                );
                            }
                        })}
                    </View>
                )}
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 50,
                        marginBottom: 10,
                    }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require("../../assets/images/logo_login.jpg")}
                    />
                </View>
                <View style={styles.tieude}>
                    <Text style={[styles.td]}>
                        {multilang[lang].chao}{" "}
                        <Text style={{ fontSize: 35 }}>
                            {userIdFromDevice && userIdFromDevice}!
                        </Text>
                    </Text>
                    <Text
                        onPress={() => loginWithAnotherUserId()}
                        style={{
                            textAlign: "center",
                            color: "gray",
                            marginTop: 10,
                        }}>
                        {/* Đăng nhập dưới UserID khác? */}
                        {multilang[lang].dangNhapVoiSoTheKhac}
                    </Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        theme={{
                            roundness: 2,
                            mode: "exact",
                            colors: {
                                ...DefaultTheme.colors,
                                primary: "#0D4A85",
                                underlineColor: "transparent",
                            },
                        }}
                        value={userLogin.password}
                        label={multilang[lang].matKhau}
                        mode="outlined"
                        secureTextEntry={showPassW}
                        right={
                            <TextInput.Icon
                                name={showPassW ? "eye" : "eye-off"}
                                color={"#ccc"}
                                onPress={() => {
                                    setShowPassW(!showPassW);
                                }}
                            />
                        }
                        placeholder={multilang[lang].matKhau}
                        style={[styles.inputlogin]}
                        onChangeText={(val) => {
                            setUserLogin({ ...userLogin, password: val });
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                        }}>
                        <TouchableOpacity
                            style={[styles.btndn]}
                            onPress={() => login()}>
                            <Text style={styles.textbtndn}>
                                {" "}
                                {multilang[lang].dangNhap}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnFinger}
                            onPress={() => {
                                scanFingerprint();
                            }}>
                            {isFaceID == 0 ? (
                                <Image
                                    source={require("../../assets/images/faceid_touchid.png")}
                                    style={{ width: 35, height: 35 }}
                                />
                            ) : isFaceID == 1 ? (
                                <Ionicons
                                    name="finger-print-outline"
                                    size={35}
                                    color="white"
                                />
                            ) : (  <Image
                                source={require("../../assets/images/icon_faceid.png")}
                                style={{ width: 35, height: 35 }}
                            />) }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ChangePassCMND");
                        }}>
                        <Text
                            style={{
                                color: "gray",
                                marginTop: 10,
                                textDecorationLine: "underline",
                                textDecorationColor: "#0D4A85",
                            }}>
                            {multilang[lang].quenMatKhau}
                        </Text>
                    </TouchableOpacity>
                </View>
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
            {isLoadingLogin && (
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
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    td: {
        color: "#2D5881",
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
    },
    tinyLogo: {
        width: 80,
        height: 80,
    },
    tieude: {
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        textAlign: "center",
    },
    form: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 30,
    },
    inputlogin: {
        backgroundColor: "white",
        borderRadius: 10,
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
    btnFinger: {
        marginTop: 30,
        marginLeft: 2,
        width: "20%",
        height: 55,
        backgroundColor: "#0D4A85",
        borderBottomEndRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: "center",
        alignItems: "center",
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
