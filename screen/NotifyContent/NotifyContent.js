import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";
import And from "react-native-vector-icons/AntDesign";
export default function NotifyContent({ route }) {
    let { item } = route.params;

    console.log({ item });
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
            {/* <Text>{item?.Content}</Text> */}
            <ScrollView>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 20,
                        borderBottomColor: "#DFDFDE",
                        borderBottomWidth: 1,
                        paddingHorizontal: 5,
                        paddingBottom: 20,
                    }}>
                    {/* <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                        {item?.Subjects}
                    </Text> */}
                    <Text
                        style={{
                            fontSize: 25,
                            textAlign: "justify",
                            color: "black",
                            fontWeight: "bold",
                            marginBottom: 10,
                            textTransform: "uppercase",
                        }}>
                        {item?.Notifications}
                    </Text>
                    <TouchableOpacity>
                        <And name="link" size={36} color="#7F8487" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <Text style={{ textAlign: "justify", fontSize: 16 }}>
                        {item?.Content}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
