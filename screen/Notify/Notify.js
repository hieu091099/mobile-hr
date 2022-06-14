import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { getToken } from "../../config";
import {
    getNotifications,
    updateUserNotification,
} from "../../redux/actions/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export default function Notify({ navigation }) {    
    const { user } = useSelector((state) => state.UserReducer);
    const { listNotifications, idNotify,lang } = useSelector(
        (state) => state.NotificationReducer,
    );
    const dispatch = useDispatch();
    // console.log(moment.locale());

    useEffect(() => {
        getToken("accessToken").then((res) => {
            if (res != undefined) {
                dispatch(getNotifications(user.userId, res));
            }
        });
    }, [idNotify]);

    const updateUserNotificationByUserId = async (item) => {
        let accessToken = await getToken("accessToken");

        dispatch(
            updateUserNotification(user.userId, item, accessToken, navigation),
        );
    };
    const navigateToContent = (item) => {
        navigation.navigate("NotifyContent", {
            item: item,
        });
    };
    const renderNotify = () => {
        return listNotifications?.map((item, index) => {
            return (
                <TouchableOpacity
                    onPress={() =>
                        item.isReaded == 0
                            ? updateUserNotificationByUserId(item)
                            : navigateToContent(item)
                    }
                    style={
                        item.isReaded == 1
                            ? [styles.notiBox]
                            : [styles.notiBox, styles.unRead]
                    }
                    key={index}>
                    <View style={styles.itemLeft}>
                        <View style={styles.iconLeft}>
                            <AntDesign
                                name="notification"
                                size={25}
                                color={"white"}
                            />
                        </View>
                    </View>
                    <View style={styles.itemCenter}>
                        <View>
                            <Text>{item.Notifications}</Text>
                        </View>
                        <View>
                            <Text style={{}}>
                                {moment(
                                    item.Modify_Date,
                                    "YYYY-MM-DD HH:mm:ss",
                                ).fromNow()}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.itemRight}>
                        <Icon name="dots-horizontal" size={18} />
                    </View>
                </TouchableOpacity>
            );
        });
    };
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {listNotifications != "" ? (
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        paddingBottom: 100,
                    }}>
                    {renderNotify()}
                </ScrollView>
            ) : (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Image
                        style={{ width: "50%", height: "50%", marginTop: 50 }}
                        source={require("../../assets/images/notification.png")}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    notiBox: {
        padding: 10,
        paddingVertical: 20,
        flexDirection: "row",
        borderBottomColor: "#F1EEE9",
        borderBottomWidth: 0.5,
    },
    unRead: {
        backgroundColor: "#ebf7fa",
    },
    itemLeft: {
        alignItems: "center",
        justifyContent: "center",
        width: "20%",
    },
    itemCenter: {
        width: "70%",
        justifyContent: "center",
    },
    itemRight: {
        width: "10%",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    iconLeft: {
        backgroundColor: "#0D4A85",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: 50,
        transform: [{ rotateY: "180deg" }],
    },
});
