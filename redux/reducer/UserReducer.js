import { getToken } from "../../config";

const stateDefault = {
    user: [],
    userToken: "",
    isLoggedIn: false,
    checkUndefined: true,
    salary: [],
    isLoadingLogin: false,
    isVisibleLogin: false,
    isVisibleExpired: false,
    messageLoginResponse: "",
    messageExpiredToken: "",
    checkIsChoose: 0,
    listOnLeave: [],
    setShowYearPicker: false,
    listOnLeaveSummary: [],
    listOverTime: [],
    lang: "vi",
};

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "LOGIN": {
            state.user = action.user;
            state.userToken = action.userToken;
            state.isLoggedIn = true;
            return { ...state };
        }
        case "LOGIN_FAIL": {
            state.isVisibleLogin = true;
            state.messageLoginResponse = action.messageLoginResponse;
            return { ...state };
        }
        case "CLOSE_DIALOG_LOGIN": {
            state.isVisibleLogin = false;
            return { ...state };
        }
        case "EXPIRED_TOKEN": {
            state.isVisibleExpired = true;
            state.messageExpiredToken = action.message;
            return { ...state };
        }
        case "CLOSE_DIALOG_EXPIRED": {
            state.isVisibleExpired = false;
            return { ...state };
        }
        case "LOGOUT": {
            state.user = [];
            state.userToken = "";
            state.isLoggedIn = false;
            return { ...state };
        }
        case "LOGIN_FINGER": {
            state.user = action.user;
            state.isLoggedIn = true;
            return { ...state };
        }
        case "GET_SALARY": {
            state.salary = action.salary;
            state.checkUndefined = false;
            return { ...state };
        }
        case "LOGIN_ANOTHER_USERID": {
            state.isLoggedIn = false;
            state.checkIsChoose++;
            return { ...state };
        }
        case "SET_UNMOUNTED": {
            state.isLoggedIn = false;
            return { ...state };
        }
        case "GET_ONLEAVE": {
            state.listOnLeave = action.onLeave;
            return { ...state };
        }
        case "GET_ONLEAVE_SUMMARY": {
            state.listOnLeaveSummary = action.onLeaveSummary;
            return { ...state };
        }
        case "SET_SHOW_YEAR_PICKER": {
            state.setShowYearPicker = !state.setShowYearPicker;
            return { ...state };
        }
        case "GET_OVERTIME": {
            state.listOverTime = action.overTime;
            return { ...state };
        }
        case "CHANGE_LANG": {
            state.lang = action.lang;
            return { ...state };
        }
        case "SET_LODING_LOGIN": {
            state.isLoadingLogin = action.isLoadingLogin;
            return { ...state };
        }
        // case 'CHANGE_SCREEN': {
        //     state.indexScreen = action.indexScreen;
        //     return { ...state };
        // }
        default:
            return { ...state };
    }
};
