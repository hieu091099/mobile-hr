const stateDefault = {
    listNotifications: [],
    idNotify: "",
    internetStatus: true,
};

export const NotificationReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "GET_NOTIFICATIONS": {
            state.listNotifications = action.listNotifications;
            return { ...state };
        }
        case "CHOOSE_ID_NOTI": {
            state.idNotify = action.idNotify;
            return { ...state };
        }
        case "CHANGE_STATUS_INTERNET": {
            state.internetStatus = action.isConnect;
            return { ...state };
        }
        default:
            return { ...state };
    }
};
