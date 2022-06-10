import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../config";
import { getNotifications } from "../../redux/actions/NotificationAction";
import moment from "moment";

export default function HeaderHomeScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user, isLoggedIn, lang } = useSelector(
        (state) => state.UserReducer,
    );
    const { listNotifications, idNotify } = useSelector(
        (state) => state.NotificationReducer,
    );

    const sumNotification = () => {
        let result = 0;
        for (let i in listNotifications) {
            if (listNotifications[i].isReaded == 0) {
                result += 1;
            }
        }
        return result;
    };

    useEffect(() => {
        getToken("accessToken").then((res) => {
            if (res != undefined) {
                dispatch(getNotifications(user.userId, res));
            }
        });
    }, [idNotify]);

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    navigation.toggleDrawer();
                }}
                style={styles.leftItem}>
                <Ionicons name="menu" size={30} />
            </TouchableOpacity>
            <View style={styles.rightItem}>
                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => {
                        // navigation.navigate("Notify");
                    }}>
                    <Ionicons
                        name="md-notifications-circle-outline"
                        size={30}
                    />
                    {sumNotification() > 0 ? (
                        <Badge style={{ position: "absolute" }}>
                            {sumNotification()}
                        </Badge>
                    ) : (
                        <></>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 65,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#EEEEEE",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    leftItem: {
        padding: 6,
        borderRadius: 10,
        borderColor: "#EEEEEE",
        borderWidth: 1,
    },
    rightItem: {
        flexDirection: "row",
    },
    iconRight: {
        marginLeft: 10,
        padding: 6,
        position: "relative",
        borderRadius: 10,
        borderColor: "#EEEEEE",
        borderWidth: 1,
    },
});
