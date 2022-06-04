const stateDefault = {
    listNotifications: [],
    idNotify: "",
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
        default:
            return { ...state };
    }
};
