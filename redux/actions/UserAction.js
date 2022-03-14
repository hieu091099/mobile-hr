import { axiosInstance, setToken } from "../../config"


export const loginAction = (userLogin) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstance.post('user/login', userLogin);
            if (result.data.authenticated == true) {
                await setToken("accessToken", result.data.accessToken);
                await setToken("user", result.data.user);
                dispatch({
                    type: 'LOGIN',
                    user: result.data.user,
                    userToken: result.data.accessToken
                })
            } else {
                console.log(result.data.message);
            }
        } catch (e) {
            console.log(e)
        }

    }
}