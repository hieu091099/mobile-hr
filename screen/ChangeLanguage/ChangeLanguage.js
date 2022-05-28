import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTheme } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { setToken } from "../../config";

export default function ChangeLanguage() {
    const { lang } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const checkactive = (langinmenu) => {
        if (lang == langinmenu) {
            return styles.menuactive;
        }
    };
    const changelang = (langinmenu) => {
        dispatch({
            type: "CHANGE_LANG",
            lang: langinmenu,
        });
        setToken("lang", langinmenu);
        navigation.navigate("MainTab");
    };
    return (
        <View
            style={{
                display: "flex",
                padding: 20,
                flex: 1,
                backgroundColor: "#FAFAFA",
            }}>
            <TouchableOpacity
                onPress={() => {
                    changelang("mm");
                }}>
                <View style={[styles.viewlang, checkactive("mm")]}>
                    <View style={styles.logolang}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require(`../../assets/images/flags/mm.png`)}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.viewtextlang}>
                        <Text style={[styles.textlang, checkactive("mm")]}>
                            မြန်မာဘာသာစကား
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    changelang("vi");
                }}>
                <View style={[styles.viewlang, checkactive("vi")]}>
                    <View style={styles.logolang}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../../assets/images/flags/vi.png")}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.viewtextlang}>
                        <Text style={[styles.textlang, checkactive("vi")]}>
                            Tiếng việt
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    changelang("tw");
                }}>
                <View style={[styles.viewlang, checkactive("tw")]}>
                    <View style={styles.logolang}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../../assets/images/flags/tw.png")}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.viewtextlang}>
                        <Text style={[styles.textlang, checkactive("tw")]}>
                            台湾
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    changelang("en");
                }}>
                <View style={[styles.viewlang, checkactive("en")]}>
                    <View style={styles.logolang}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../../assets/images/flags/en.png")}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.viewtextlang}>
                        <Text style={[styles.textlang, checkactive("en")]}>
                            English
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = new StyleSheet.create({
    viewlang: {
        backgroundColor: "white",
        height: 80,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    logolang: {
        width: 70,
        height: 70,
        borderRadius: 50,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    viewtextlang: {
        marginLeft: 30,
        justifyContent: "center",
    },
    textlang: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    menuactive: {
        backgroundColor: "#0D4A85",
        color: "white",
    },
});
