
const stateDefault = {
    user: [],
    userToken: '',
    isLoggedIn: false,
    salary: [],
    indexScreen: ''
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state.user = action.user;
            state.userToken = action.userToken;
            state.isLoggedIn = true;
            return { ...state };
        }
        case 'LOGOUT': {
            state.user = [];
            state.userToken = '';
            state.isLoggedIn = false;
            return { ...state };
        }
        case 'LOGIN_FINGER': {
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
        default: return { ...state }
    }
}