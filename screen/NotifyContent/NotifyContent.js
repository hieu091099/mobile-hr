import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function NotifyContent({ route }) {
    let { notificationId } = route.params;
    let { listNotifications } = useSelector(
        (state) => state.NotificationReducer,
    );
    const renderNotifyContent = () => {
        return listNotifications?.map((item) => {
            if (item.ID == notificationId) {
                return (
                    <View>
                        <Text>{item.Content}</Text>
                    </View>
                );
            }
        });
    };
    console.log({ listNotifications });
    return <View>{renderNotifyContent()}</View>;
}
