import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Drawer } from "react-native-paper";
// import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FonttistoIcon from "react-native-vector-icons/Fontisto";

import { checkTokenExpired } from "../../config";
import DialogNavigate from "../../components/SimpleDialog/DialogNavigate";
import { useNavigation } from "@react-navigation/native";
import SvgQRCode from "react-native-qrcode-svg";
import { multilang } from "../../language/multilang";
import AweIcon from "react-native-vector-icons/FontAwesome";

export default function DrawerContent(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { isVisibleExpired, messageExpiredToken, user,lang } = useSelector(
        (state) => state.UserReducer,
    );
    const [zoomQr, setZoomQr] = useState(false);
    let arrName = user?.fullName.split(" ");
    let firstName = `${arrName[arrName.length - 2]} ${
        arrName[arrName.length - 1]
    }`;
    const logout = async (props) => {
        await props.navigation.closeDrawer();
        dispatch({
            type: "LOGOUT",
        });
    };

    const RMenuList = ({ name, icon, navigate }) => {
        return (
            <TouchableOpacity
                style={styles.menuList}
                onPress={() => {
                    navigation.navigate(navigate);
                }}>
                <View style={styles.iconMenu}>
                    {/*  */}
                    {icon}
                </View>
                <View style={styles.textMenuBox}>
                    <Text style={styles.textMenu}>{name}</Text>
                </View>
                <View style={styles.iconMenu}>
                    <AntIcon name="right" size={16} color="#5C5C5C" />
                </View>
            </TouchableOpacity>
        );
    };
    const RMenuListDisble = ({ name }) => {
        return (
            <View style={[styles.menuList, styles.menuDisble]}>
                <View style={styles.textMenuBox}>
                    <Text style={[styles.textMenu, styles.textMenuDisble]}>
                        {name}
                    </Text>
                </View>
            </View>
        );
    };
    useEffect(() => {
        setInterval(() => {
            checkTokenExpired().then((res) => {
                if (res === 0) {
                    dispatch({
                        type: "EXPIRED_TOKEN",
                        message:
                            "Phi??n ????ng nh???p ???? h???t h???n! \nVui l??ng ????ng nh???p l???i ????? ti???p t???c!",
                    });
                }
            });
        }, 10000);
    }, []);
    return (
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}>
            <View style={styles.avatar}>
                <View
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        borderWidth: 4,
                        borderColor: "#084594",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {/* <Image
                        style={{ width: 90, height: 90 }}
                        source={{
                            uri: "https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-5200586-4385765.png",
                        }}
                    /> */}
                    <TouchableOpacity onPress={()=>{
                        setZoomQr(true);
                    }}>
                     <SvgQRCode
                    value={user.userId}
                    size={60}
                    backgroundColor="#084594"
                    color="white"
                /></TouchableOpacity>
                <AweIcon name='eye' size={15} color={"#084594"}/>
                </View>
                <Text style={styles.nameUser}>{firstName}</Text>
            </View>

            {/* <View style={styles.detailRow}>
                <SvgQRCode
                    value={user.userId}
                    size={120}
                    backgroundColor="#084594"
                    color="white"
                />
            </View> */}
            <DrawerContentScrollView {...props}>
                <View style={styles.menuRow}>
                    <RMenuListDisble   name={multilang[lang].thongTin} />
                    <RMenuList
                       name={multilang[lang].thongTin} 
                        icon={
                            <AntIcon
                                type="ant-design"
                                name="infocirlceo"
                                size={20}
                                color="#5C5C5C"
                            />
                        }
                        navigate="UserDetail"
                    />
                    <RMenuList
                        name={multilang[lang].luong}
                        icon={
                            <AntIcon
                                name="creditcard"
                                size={20}
                                color="#5C5C5C"
                            />
                        }
                        navigate="Salary"
                    />
                    <RMenuList
                         name={multilang[lang].ngayNghi}
                        icon={
                            <FonttistoIcon
                                name="holiday-village"
                                size={20}
                                color="#5C5C5C"
                            />
                        }
                        navigate="OnLeave"
                    />
                    <RMenuList
                        name={multilang[lang].tangCa}
                        icon={
                            <EntypoIcon
                                name="time-slot"
                                size={20}
                                color="#5C5C5C"
                            />
                        }
                        navigate="OverTime"
                    />
                    <RMenuListDisble name={multilang[lang].troGiup} />
                    {/* <RMenuList
                       name={multilang[lang].thongBao}
                        icon={
                            <AntIcon
                                name="notification"
                                size={20}
                                color="#5C5C5C"
                            />
                        }
                        navigate="Notify"
                    /> */}
                    <RMenuList
                         name={multilang[lang].doiMatKhau}
                        icon={<AntIcon name="key" size={20} color="#5C5C5C" />}
                        navigate="ChangePassword"
                    />
                    <RMenuList
                        name={multilang[lang].lienHe}
                        icon={
                            <AntIcon
                                name="contacts"
                                size={20}
                                color="#5C5C5C"
                            />
                        }
                        navigate="Contact"
                    />
                    <RMenuList
                           name={multilang[lang].caiDat}
                        icon={
                            <AntIcon name="setting" size={20} color="#5C5C5C" />
                        }
                        navigate="Setting"
                    />
                    <RMenuList
                    name={multilang[lang].soTay}
                        icon={<AntIcon name="book" size={20} color="#5C5C5C" />}
                        navigate="Book"
                    />
                    <TouchableOpacity
                        style={[styles.menuList]}
                        onPress={() => {
                            logout(props);
                        }}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="logout" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>{multilang[lang].dangXuat}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              
            </DrawerContentScrollView>
            {zoomQr && (
                <Pressable
                    style={styles.zoomqr}
                    onPress={() => {
                        setZoomQr(false);
                    }}>
                    <View>
                        <SvgQRCode
                            value={user.userId}
                            size={200}
                            backgroundColor="white"
                            color="#084594"
                        />
                    </View>
                </Pressable>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#084594",
    },
    zoomqr:{
        position:"absolute",
        top:0,
        left:0,
        backgroundColor: "#000000b3",
        width: '100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    avatar: {
        width: "100%",
        height: 200,
        backgroundColor: "white",
        // borderRadius:20
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    detailRow: {
        width: "100%",
        height: 150,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    menuRow: {
        height: 600,
        backgroundColor: "white",
        // flex:1
    },
    nameUser: {
        fontSize: 22,
        marginTop: 10,
        fontWeight: "bold",
        color: "#21497D",
    },
    colDetail: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    detailNumber: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    detailText: {
        fontSize: 14,
        color: "#DBDBDB",
    },
    menuList: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingVertical: 10,
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: 1,
    },
    menuDisble: {
        // backgroundColor: "#CCC",
        backgroundColor:"#084594"
    },
    iconMenu: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
    },
    textMenuBox: {
        width: "70%",
        justifyContent: "center",
        paddingLeft: 10,
    },
    textMenu: {
        fontSize: 14,
        color: "#5C5C5C",
    },
    textMenuDisble: {
        fontWeight: "bold",
        color:"white"
    },
});
