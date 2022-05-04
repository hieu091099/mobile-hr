import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ChangePassword() {
    const navigation = useNavigation();
    const [nowPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [newPassCf, setNewPassCf] = useState();

    return (
        <ImageBackground
            source={require("../../assets/images/bg_login2.png")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                <Text style={styles.title}>Thay đổi mật khẩu</Text>

                <TextInput
                    secureTextEntry={true}
                    label="Mật khẩu hiện tại"
                    mode="outlined"
                    value={nowPass}
                    onChangeText={setOldPass}
                    style={styles.input}
                />

                <TextInput
                    secureTextEntry={true}
                    label="Mật khẩu mới"
                    mode="outlined"
                    value={newPass}
                    onChangeText={setNewPass}
                    style={styles.input}
                />

                <TextInput
                    secureTextEntry={true}
                    label="Xác nhận mật khẩu"
                    mode="outlined"
                    value={newPassCf}
                    onChangeText={setNewPassCf}
                    style={styles.input}
                />
                <View
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <View style={styles.btn}>
                        <Text
                            style={styles.textBtn}
                            onStartShouldSetResponder={() => {
                                navigation.navigate("SuccessChangePass");
                            }}>
                            Đổi mật khẩu
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    // input: {
    //     backgroundColor: "white",
    //     borderBottomWidth: 2,
    //     borderBottomColor: "#D5D5D5",
    //     height: 40,
    //     marginBottom: 30,
    //     color: "black",
    //     fontWeight: "bold",
    //     fontSize: 20,
    // },
    label: {
        color: "#7F7F7F",
    },
    title: {
        fontSize: 30,
        color: "black",
        marginTop: 30,
        marginBottom: 50,
        fontWeight: "900",
    },
    input: {
        backgroundColor: "white",
        borderRadius: 10,
    },
    btn: {
        backgroundColor: "#0D4A85",
        width: "100%",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 20,

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
