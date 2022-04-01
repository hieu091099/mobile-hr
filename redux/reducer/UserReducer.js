import { getToken } from "../../config";

const stateDefault = {
    user: [],
    userToken: '',
    isLoggedIn: false,
    salary: [],
    indexScreen: '',
    isVisibleLogin: false,
    messageLoginResponse: '',
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state.user = action.user;
            state.userToken = action.userToken;
            state.isLoggedIn = true;
            return { ...state };
        }
        case 'LOGIN_FAIL': {
            state.isVisibleLogin = true;
            state.messageLoginResponse = action.messageLoginResponse;
            return { ...state };
        }
        case 'CLOSE_DIALOG_LOGIN': {
            state.isVisibleLogin = false;
            return { ...state };
        }
        case 'LOGOUT': {
            state.user = [];
            state.userToken = '';
            state.isLoggedIn = false;
            return { ...state };
        }
        case 'LOGIN_FINGER': {
            let user = [];
            getToken('user').then((res) => {
                if (res != null) {
                    console.log('test', res)
                    res = JSON.parse(res);
                    user.push(res);
                }
            })
            state.user = user;
            state.isLoggedIn = true;
            return { ...state };
        }
        case 'GET_SALARY': {
            state.salary = action.salary;
            return { ...state };
        }
        case 'CHANGE_SCREEN': {
            state.indexScreen = action.indexScreen;
            return { ...state };
        }
        case 'LOGOUT': {
            state.user = [];
            state.isLoggedIn = false;
            return { ...state };
        }
        default: return { ...state }
    }
}