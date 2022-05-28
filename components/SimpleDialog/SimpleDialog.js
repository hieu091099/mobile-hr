import React, { useState } from "react";
import { Button, Dialog } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";

const SimpleDialog = ({
    visible,
    setVisible,
    message,
    confirmWithCondition = () => {},
    cancel,
}) => {
    // const cfm = confirmWithCondition;
    const toggleDialog = () => {
        setVisible(!visible);
        if (cancel == true) {
            confirmWithCondition();
        }
    };
    return (
        <View>
            <Dialog
                isVisible={visible}
                // onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Thông Báo" />
                <Text style={{ marginBottom: 20 }}>{message}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        containerStyle={{
                            width: cancel ? "50%" : "100%",
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

                    {cancel && (
                        <Button
                            containerStyle={{
                                width: "50%",
                                paddingHorizontal: 5,
                                // marginHorizontal: 50,
                                // marginVertical: 10,
                            }}
                            buttonStyle={{
                                backgroundColor: "#9B100C",
                                borderColor: "transparent",
                                borderWidth: 0,
                            }}
                            onPress={() => setVisible(!visible)}
                            title="HỦY BỎ"></Button>
                    )}
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

export default SimpleDialog;
