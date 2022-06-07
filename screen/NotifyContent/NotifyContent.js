import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function NotifyContent({ route }) {
    let { item } = route.params;

    console.log({ item });
    return (
        <View key={1}>
            <Text>{item.Content}</Text>
        </View>
    );
}
