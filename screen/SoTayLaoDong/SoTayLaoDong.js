import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { usePreventScreenCapture } from 'expo-screen-capture';

export default function SoTayLaoDong() {
  usePreventScreenCapture();
    const [visible, setvisible] = useState(true);
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <WebView
              originWhitelist={['*']}
                onLoadEnd={(syntheticEvent) => {
                    //  console.log(syntheticEvent);
                    setvisible(!syntheticEvent.nativeEvent);
                }}
                source={{
                    uri: "http://b2b.lacty.com.vn/webview/pdfjs.html?url=http://b2b.lacty.com.vn/webview/lhg/lhg.pdf",
                }}
                style={{ width: "100%", height: "100%" }}
            />
            {/* </View> */}
            {visible && (
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#00000021",
                    }}>
                    <ActivityIndicator size="large" color="#0D4A85" />
                </View>
            )}
        </View>
    );
}
