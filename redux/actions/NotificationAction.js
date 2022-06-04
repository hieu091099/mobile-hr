import {
    axiosInstance,
    axiosInstanceToken,
    BASE_URL,
    checkLoginFinger,
    getToken,
    setToken,
} from "../../config";

export const getNotifications = (userId, accessToken) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstanceToken(
                "GET",
                `notification/getAllNotificationsByUserId/${userId}`,
                accessToken,
            );
            // console.log(result.data);
            dispatch({
                type: "GET_NOTIFICATIONS",
                listNotifications: result.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const updateUserNotification = (
    userId,
    notificationId,
    accessToken,
    navigation,
) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstanceToken(
                "POST",
                `notification/updateNotificationUser`,
                accessToken,
                { userId, notificationId },
            );
            if (result.status == 200) {
                dispatch(getNotifications(userId, accessToken));
                dispatch({
                    type: "CHOOSE_ID_NOTI",
                    idNotify: notificationId,
                });
                navigation.navigate("NotifyContent", {
                    notificationId: notificationId,
                });
            }

            // getNotifications(userId, accessToken);
        } catch (e) {
            console.log(e);
        }
    };
};
