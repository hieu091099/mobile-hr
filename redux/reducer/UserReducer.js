
const stateDefault = {
    user: [],
    userToken: '',
    isLoggedIn: false
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state.user = action.user;
            state.userToken = action.userToken;
            state.isLoggedIn = true;
            return { ...state };
        }
        default: return { ...state }
    }
}