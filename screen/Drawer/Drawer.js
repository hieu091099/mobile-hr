import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Drawer } from "react-native-paper";
// import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { checkTokenExpired } from "../../config";
import DialogNavigate from "../../components/SimpleDialog/DialogNavigate";
import { useNavigation } from "@react-navigation/native";

export default function DrawerContent(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { isVisibleExpired, messageExpiredToken, user } = useSelector(
        (state) => state.UserReducer,
    );
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
    useEffect(() => {
        setInterval(() => {
            checkTokenExpired().then((res) => {
                if (res === 0) {
                    dispatch({
                        type: "EXPIRED_TOKEN",
                        message:
                            "Phiên đăng nhập đã hết hạn! \nVui lòng đăng nhập lại để tiếp tục!",
                    });
                }
            });
        }, 10000);
    }, []);
    return (
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}>
            {/* <DialogNavigate
                visible={isVisibleExpired}
                message={messageExpiredToken}
            /> */}

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
                    <Image
                        style={{ width: 90, height: 90 }}
                        source={{
                            uri: "https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-5200586-4385765.png",
                        }}
                    />
                </View>
                <Text style={styles.nameUser}>{firstName}</Text>
            </View>

            <View style={styles.detailRow}>
                <View style={styles.colDetail}>
                    <Text style={styles.detailNumber}>27</Text>
                    <Text style={styles.detailText}>Employee</Text>
                </View>
                <View style={styles.colDetail}>
                    <Text style={styles.detailNumber}>12</Text>
                    <Text style={styles.detailText}>Client</Text>
                </View>
                <View style={styles.colDetail}>
                    <Text style={styles.detailNumber}>50</Text>
                    <Text style={styles.detailText}>Total File</Text>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <View style={styles.menuRow}>
                    <TouchableOpacity
                        style={[styles.menuList, { marginTop: 10 }]}
                        onPress={() => {
                            navigation.navigate("ChangePassword");
                        }}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="setting" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>Setting</Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <AntIcon name="right" size={16} color="#5C5C5C" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuList}
                        onPress={() => {
                            navigation.navigate("SuccessChangePass");
                        }}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="link" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>Premium</Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <AntIcon name="right" size={16} color="#5C5C5C" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuList}>
                        <View style={styles.iconMenu}>
                            <AntIcon
                                name="areachart"
                                size={20}
                                color="#5C5C5C"
                            />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>Holiday</Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <AntIcon name="right" size={16} color="#5C5C5C" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuList}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="staro" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>AppLock</Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <EntypoIcon
                                name="switch"
                                size={16}
                                color="#5C5C5C"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuList}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="setting" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>
                                Share With Friends
                            </Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <AntIcon name="right" size={16} color="#5C5C5C" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuList}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="link" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>
                                Terms of Services
                            </Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <AntIcon name="right" size={16} color="#5C5C5C" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuList}>
                        <View style={styles.iconMenu}>
                            <AntIcon
                                name="areachart"
                                size={20}
                                color="#5C5C5C"
                            />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>Privacy Policy</Text>
                        </View>
                        <View style={styles.iconMenu}>
                            <AntIcon name="right" size={16} color="#5C5C5C" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuList}
                        onPress={() => {
                            logout(props);
                        }}>
                        <View style={styles.iconMenu}>
                            <AntIcon name="logout" size={20} color="#5C5C5C" />
                        </View>
                        <View style={styles.textMenuBox}>
                            <Text style={styles.textMenu}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#084594"
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
        height: 90,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    menuRow: {
        height: 530,
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
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingVertical: 10,
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: 1,
        borderRadius: 10,
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
});
