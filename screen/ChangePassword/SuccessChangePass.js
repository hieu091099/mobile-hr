import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { multilang } from "../../language/multilang";
import { useSelector } from "react-redux";
export default function SuccessChangePass() {
    const { lang } =
    useSelector((state) => state.UserReducer);
    const navigation = useNavigation();
    return (
        <View
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View
                style={{
                    justifyContent: "center",
                    width: "100%",
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Image
                    source={require("../../assets/images/SuccessChangePass.png")}
                    style={{ height: 500, width: "80%" }}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.title}>{multilang[lang].capNhatThanhCong}</Text>
            <Text style={styles.titleSmall}>
            {multilang[lang].matKhauDaDuocThayDoiThanhCong}
            </Text>
            <View style={styles.btn}>
                <Text
                    style={styles.textBtn}
                    onStartShouldSetResponder={() => {
                        navigation.navigate("MainTab");
                    }}>
                     {multilang[lang].veTrangChu}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
    },
    titleSmall: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 10,
        color: "#787878",
    },
    btn: {
        backgroundColor: "#0D4A85",
        width: "90%",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 30,

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
