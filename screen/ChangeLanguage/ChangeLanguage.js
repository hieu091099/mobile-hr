import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox, withTheme } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { setToken } from "../../config";
import { RadioButton } from "react-native-paper";
import { multilang } from "../../language/multilang";

export default function ChangeLanguage({ route, navigation }) {
    let { lang } = route.params;
    const [checked, setChecked] = useState(lang);
    const dispatch = useDispatch();
    useEffect(() => {
        return navigation.addListener("focus", () => {
            setChecked(lang);
        });
    }, [lang]);
    const changeLang = () => {
        dispatch({
            type: "CHANGE_LANG",
            lang: checked,
        });
        setToken("lang", checked);
        navigation.navigate("MainTab");
    };
    return (
        <View
            style={{
                display: "flex",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                padding: 10,
                flex: 1,
                backgroundColor: "white",
            }}>
            <View>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => setChecked("vi")}>
                    <View style={styles.item}>
                        <Image
                            style={styles.imageStyle}
                            source={require("../../assets/images/flags/vi.png")}
                            resizeMode="contain"
                        />
                        <Text style={styles.styleText}>Tiếng Việt</Text>
                    </View>
                    <RadioButton
                        value="vi"
                        color="#1F4690"
                        status={checked === "vi" ? "checked" : "unchecked"}
                        onPress={() => setChecked("vi")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => setChecked("tw")}>
                    <View style={styles.item}>
                        <Image
                            style={styles.imageStyle}
                            source={require("../../assets/images/flags/tw.png")}
                            resizeMode="contain"
                        />
                        <Text style={styles.styleText}>台湾</Text>
                    </View>
                    <RadioButton
                        value="tw"
                        color="#1F4690"
                        status={checked === "tw" ? "checked" : "unchecked"}
                        onPress={() => setChecked("tw")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rowItem}
                    onPress={() => setChecked("en")}>
                    <View style={styles.item}>
                        <Image
                            style={styles.imageStyle}
                            source={require("../../assets/images/flags/en.png")}
                            resizeMode="contain"
                        />
                        <Text style={styles.styleText}>English</Text>
                    </View>
                    <RadioButton
                        value="en"
                        color="#1F4690"
                        status={checked === "en" ? "checked" : "unchecked"}
                        onPress={() => setChecked("en")}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.styleButton, { width: "100%", borderRadius: 5 }]}
                onPress={() => changeLang()}>
                <Text style={styles.styleTextButton}>
                    {" "}
                    {multilang[checked].luuThayDoi}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = new StyleSheet.create({
    rowItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: "#EFEFEF",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageStyle: {
        width: 20,
        height: 20,
        borderRadius: 100,
        marginRight: 10,
    },
    styleText: {
        fontWeight: "bold",
    },
    styleButton: {
        marginTop: 10,
        width: "80%",
        height: 50,
        backgroundColor: "#0D4A85",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    styleTextButton: {
        fontSize: 13,
        color: "white",
        fontWeight: "600",
        textTransform: "uppercase",
    },
});
