import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function SuccessChangePass() {
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
            <Text style={styles.title}>Cập Nhật Thành Công</Text>
            <Text style={styles.titleSmall}>
                Mật khẩu đã được cập nhật thành công
            </Text>
            <View style={styles.btn}>
                <Text
                    style={styles.textBtn}
                    onStartShouldSetResponder={() => {
                        navigation.navigate("MainTab");
                    }}>
                    Về Trang Chủ
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "900",
        textAlign: "center",
    },
    titleSmall: {
        fontSize: 15,
        fontWeight: "900",
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
