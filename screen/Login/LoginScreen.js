import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from "react-native"
import { TextInput } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Ionicons"
import * as LocalAuthentication from "expo-local-authentication"
import { PaperSelect } from "react-native-paper-select"
import { Provider as PaperProvider } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { loginAction, loginFingerAction } from "../../redux/actions/UserAction"
import { useNavigation } from "@react-navigation/native"
import { deleteToken, getToken } from "../../config"
import { Icon } from "react-native-elements"
import SimpleDialog from "../../components/SimpleDialog/SimpleDialog"

export default function LoginScreen() {
    /** state get userid from asyncstore */
    const [userIdFromDevice, setUserIdFromDevice] = useState("")
    const [factoryFromDevice, setFactoryFromDevice] = useState("")
    const [cancel, setCancel] = useState(false)
    /** global state get user info */
    const { user, isLoggedIn, isVisibleLogin, messageLoginResponse } =
        useSelector((state) => state.UserReducer)
    /** state set when user type input */
    const [userLogin, setUserLogin] = useState({
        userId: "",
        password: "",
        factory: "",
    })

    /** state call dialog */
    const [isVisible, setIsVisible] = useState(false)
    /** state message dialog */
    const [dialogMessage, setDialogMessage] = useState("")

    const navigation = useNavigation()
    const dispatch = useDispatch()
    getToken("user").then((res) => {
        if (res != undefined) {
            res = JSON.parse(res)
            setUserIdFromDevice(res.userId)
        }
    })
    getToken("user").then((res) => {
        if (res != undefined) {
            res = JSON.parse(res)
            setFactoryFromDevice(res.factory)
        }
    })
    const setVisibleDispatch = () => {
        dispatch({
            type: "CLOSE_DIALOG_LOGIN",
        })
    }
    const checkConditionLogin = (user) => {
        setCancel(false)
        if (user.userId == "") {
            setIsVisible(true)
            setDialogMessage("Vui lòng nhập số thẻ!")
            return false
        }
        if (user.password == "") {
            setIsVisible(true)
            setDialogMessage("Vui lòng nhập mật khẩu!")
            return false
        }
        if (user.factory == "") {
            setIsVisible(true)
            setDialogMessage("Vui lòng chọn nhà máy!")
            return false
        }
        return true
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("MainTab")
        }
    }, [isLoggedIn])

    const login = async () => {
        if (checkConditionLogin(userLogin)) {
            let action = loginAction(
                userLogin,
                navigation,
                setIsVisible,
                setDialogMessage,
            )
            dispatch(action)
        }
    }
    const [factory, setFactory] = useState({
        value: "",
        list: [
            { _id: "LYV", value: "LYV" },
            { _id: "LVL", value: "LVL" },
            { _id: "LHG", value: "LHG" },
        ],
        selectedList: [],
        error: "",
    })

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
                style={{ width: "100%", height: "100%" }}>
                <View></View>
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
                        Xin chào <Text style={{ fontSize: 35 }}>Bạn!!</Text>
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
                            setUserLogin({ ...userLogin, userId: val })
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
                        secureTextEntry={true}
                        placeholder="Mật khẩu"
                        style={[styles.inputlogin]}
                        onChangeText={(val) => {
                            setUserLogin({ ...userLogin, password: val })
                        }}
                    />

                    <PaperSelect
                        label="FACTORY"
                        value={factory.value}
                        outlineColor="gray"
                        activeOutlineColor="#0D4A85"
                        dialogButtonLabelStyle={{ color: "#0D4A85" }}
                        onSelection={(value) => {
                            setFactory({
                                ...factory,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: "",
                            })
                            setUserLogin({
                                ...userLogin,
                                factory: value.text,
                            })
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
    )
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
})
