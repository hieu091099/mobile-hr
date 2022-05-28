import React, { useState } from "react";
import { Button, Dialog } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

const DialogNavigate = ({ visible, message }) => {
    const dispatch = useDispatch();
    const toggleDialog = () => {
        dispatch({
            type: "CLOSE_DIALOG_EXPIRED",
        });
        dispatch({
            type: "LOGOUT",
        });
    };
    return (
        <View>
            <Dialog isVisible={visible}>
                <Dialog.Title title="Thông Báo" />
                <Text style={{ marginBottom: 20 }}>{message}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        containerStyle={{
                            width: "100%",
                            paddingHorizontal: 5,
                            // marginHorizontal: 50,
                            // marginVertical: 10,
                        }}
                        buttonStyle={{
                            backgroundColor: "#0D4A85",
                            borderColor: "transparent",
                            borderWidth: 0,
                        }}
                        onPress={() => toggleDialog()}
                        title="ĐỒNG Ý"></Button>
                </View>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        width: 220,
        margin: 20,
    },
    buttonContainer: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default DialogNavigate;
