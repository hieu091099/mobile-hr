import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { Provider as PaperProvider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginFingerAction } from "../../redux/actions/UserAction";
import { useNavigation } from "@react-navigation/native";
import { deleteToken, getExpoPushNoti, getToken, setToken } from "../../config";
import { Icon } from "react-native-elements";
import SimpleDialog from "../../components/SimpleDialog/SimpleDialog";
import { Value } from "react-native-reanimated";
import { multilang } from "../../language/multilang";
import * as Notifications from "expo-notifications";

export default function LoginScreen() {
    //
    const imglang = {
        vi: { img: require("../../assets/images/flags/vi.png"), name: "vi" },
        mm: { img: require("../../assets/images/flags/mm.png"), name: "mm" },
        en: { img: require("../../assets/images/flags/en.png"), name: "en" },
        tw: { img: require("../../assets/images/flags/tw.png"), name: "tw" },
    };
    //// console.log(imglang.vi);

    //
    /** state get userid from asyncstore */

    const [userIdFromDevice, setUserIdFromDevice] = useState("");
    const [factoryFromDevice, setFactoryFromDevice] = useState("");
    // const [tokenExpo, setTokenExpo] = useState("");

    const [cancel, setCancel] = useState(false);
    const [showPassW, setShowPassW] = useState(true);

    const [showChooseLang, setShowChooseLang] = useState(false);
    /** global state get user info */
    const { user, isLoggedIn, isVisibleLogin, messageLoginResponse, lang } =
        useSelector((state) => state.UserReducer);
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

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const changelang = (langinmenu) => {
        dispatch({
            type: "CHANGE_LANG",
            lang: langinmenu,
        });
        setToken("lang", langinmenu);
    };
    getToken("user").then((res) => {
        if (res != undefined) {
            res = JSON.parse(res);
            setUserIdFromDevice(res.userId);
            setFactoryFromDevice(res.factory);
        }
    });
    const setVisibleDispatch = () => {
        dispatch({
            type: "CLOSE_DIALOG_LOGIN",
        });
    };
    const checkConditionLogin = (user) => {
        setCancel(false);
        if (user.userId == "") {
            setIsVisible(true);
            setDialogMessage("Vui lòng nhập số thẻ!");
            return false;
        }
        if (user.password == "") {
            setIsVisible(true);
            setDialogMessage("Vui lòng nhập mật khẩu!");
            return false;
        }
        if (user.factory == "") {
            setIsVisible(true);
            setDialogMessage("Vui lòng chọn nhà máy!");
            return false;
        }
        return true;
    };
    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("MainTab");
        }
        return () => {};
    }, [isLoggedIn]);
    const login = async () => {
        if (checkConditionLogin(userLogin)) {
            getExpoPushNoti().then((val) => {
                //// console.log({ val });
                //setUserLogin({ ...userLogin, exponentPushToken: val });
                //console.log(userLogin);

                let action = loginAction(
                    { ...userLogin, exponentPushToken: val },
                    navigation,
                    setIsVisible,
                    setDialogMessage,
                );
                dispatch(action);
            });
        }
    };
    const [factory, setFactory] = useState({
        value: "",
        list: [
            { _id: "LYV", value: "LYV" },
            { _id: "LVL", value: "LVL" },
            { _id: "LHG", value: "LHG" },
        ],
        selectedList: [],
        error: "",
    });

    //    const returnurl= async ()=>{
    //         test:any =  require(`../../assets/images/flags/${lang}.png`);

    //    // console.log(test);

    //    }
    //   // console.log();
    return (
        <PaperProvider>
            <SimpleDialog
                visible={isVisible}
                setVisible={setIsVisible}
                message={dialogMessage}
            />
            {/* dialog for login response error */}
            <SimpleDialog
                visible={isVisibleLogin}
                setVisible={setVisibleDispatch}
                message={messageLoginResponse}
            />
            <ImageBackground
                source={require("../../assets/images/bg_login2.png")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%", position: "relative" }}>
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
                        <Text style={{ fontSize: 35 }}>Bạn!!</Text>
                    </Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        theme={{
                            colors: {
                                primary: "#0D4A85",
                                underlineColor: "transparent",
                            },
                        }}
                        value={userLogin.userId}
                        label="USERID"
                        mode="outlined"
                        placeholder="Tài khoản"
                        style={[styles.inputlogin, { marginTop: 20 }]}
                        onChangeText={(val) => {
                            setUserLogin({ ...userLogin, userId: val });
                        }}
                    />
                    <TextInput
                        theme={{
                            colors: {
                                primary: "#0D4A85",
                                underlineColor: "transparent",
                            },
                        }}
                        value={userLogin.password}
                        label="PASSWORD"
                        mode="outlined"
                        secureTextEntry={showPassW}
                        placeholder="Mật khẩu"
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
                            setUserLogin({ ...userLogin, password: val });
                        }}
                    />

                    <PaperSelect
                        label="FACTORY"
                        value={factory.value}
                        outlineColor="gray"
                        activeOutlineColor="#0D4A85"
                        dialogButtonLabelStyle={{
                            color: "#0D4A85",
                            // backgroundColor: "red",
                        }}
                        onSelection={(value) => {
                            setFactory({
                                ...factory,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: "",
                            });
                            setUserLogin({
                                ...userLogin,
                                factory: value.text,
                            });
                        }}
                        arrayList={[...factory.list]}
                        selectedArrayList={factory.selectedList}
                        errorText={factory.error}
                        multiEnable={false}
                        dialogTitleStyle={{ color: "#0D4A85" }}
                        checkboxColor="#0D4A85"
                        checkboxLabelStyle={{
                            color: "#0D4A85",
                            fontWeight: "700",
                        }}
                        textInputBackgroundColor="white"
                        textInputColor="#0D4A85"
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                        }}>
                        <TouchableOpacity
                            style={[
                                styles.btndn,
                                { width: "100%", borderRadius: 5 },
                            ]}
                            onPress={() => login()}>
                            <Text style={styles.textbtndn}>ĐĂNG NHẬP</Text>
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
                            Quên mật khẩu ?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contact}>
                    <View style={styles.contactItem}>
                        <Icon
                            name="phone-call"
                            type="feather"
                            color="#517fa4"
                            size={20}
                        />
                        <Text style={styles.contactText}>028 3875 4536</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Icon
                            name="mail"
                            type="feather"
                            color="#517fa4"
                            size={20}
                        />
                        <Text style={styles.contactText}>
                            lactycom@lacty.com.vn
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    td: {
        color: "#2D5881",
        fontSize: 25,
        fontWeight: "900",
        textAlign: "center",
    },
    tinyLogo: {
        width: 80,
        height: 80,
    },
    tieude: {
        width: "100%",
        paddingHorizontal: 20,
        // height: 200,
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
        fontWeight: "900",
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
        fontWeight: "900",
    },
});
