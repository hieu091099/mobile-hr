import {
    axiosInstance,
    axiosInstanceToken,
    BASE_URL,
    checkLoginFinger,
    getToken,
    setToken,
} from "../../config";

export const loginAction = (userLogin, navigation) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_LODING_LOGIN",
                isLoadingLogin: true,
            });
            let result = await axiosInstance.post("user/login", userLogin);
            if (result.data.authenticated == true) {
                await setToken("accessToken", result.data.accessToken);
                await setToken("refreshToken", result.data.refreshToken);
                await setToken("user", JSON.stringify(result.data.user));

                dispatch({
                    type: "LOGIN",
                    user: result.data.user,
                    userToken: result.data.accessToken,
                });
                dispatch({
                    type: "SET_LODING_LOGIN",
                    isLoadingLogin: false,
                });
            } else {
                // console.log(result.data.message);
                dispatch({
                    type: "LOGIN_FAIL",
                    messageLoginResponse: result.data.message,
                });
                dispatch({
                    type: "SET_LODING_LOGIN",
                    isLoadingLogin: false,
                });
            }
        } catch (e) {
            // console.log(e);
        }
    };
};

export const getSalaryAction = (accessToken, personId, monthYear) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstanceToken(
                "POST",
                `salary/${personId}/${monthYear}`,
                accessToken,
            );   
            if (typeof result?.data !== 'undefined' && Object.keys(result?.data).length != 1) {
                dispatch({
                    type: "GET_SALARY",
                    salary: result.data,
                });
            } else {
                dispatch({
                    type: "GET_SALARY",
                    salary:[],
                });
            }
        } catch (e) {
            alert(e);
        }
    };
};

export const getOnLeave = (accessToken, userId, monthYear) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstanceToken(
                "GET",
                `user/onLeave/${userId}/${monthYear}`,
                accessToken,
            );
            if (typeof result?.data !== 'undefined' && Object.keys(result?.data).length != 0) {

            dispatch({
                type: "GET_ONLEAVE",
                onLeave: result.data,
            });
        }else{
            dispatch({
                type: "GET_ONLEAVE",
                onLeave:[],
            });
        }
            // }
        } catch (e) {
            // console.log(e);
        }
    };
};
export const getOverTime = (accessToken, userId, monthYear) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstanceToken(
                "GET",
                `user/overTime/${userId}/${monthYear}`,
                accessToken,
            );
            if (typeof result?.data !== 'undefined' && Object.keys(result?.data).length != 0) {

            dispatch({
                type: "GET_OVERTIME",
                overTime: result.data,
            });
        }else{
            dispatch({
                type: "GET_OVERTIME",
                overTime: [],
            });
        }
        } catch (e) {
            // console.log(e);
        }
    };
};

export const getOnLeaveSummary = (accessToken, userId, year) => {
    return async (dispatch) => {
        try {
            let result = await axiosInstanceToken(
                "GET",
                `user/onLeaveSummary/${userId}/${year}`,
                accessToken,
            );
            // alert(Object.keys(result?.data).length);
            if (typeof result?.data !== 'undefined' && Object.keys(result?.data).length != 0) {
            dispatch({
                type: "GET_ONLEAVE_SUMMARY",
                onLeaveSummary: result.data,
            });
        }else{
            dispatch({
                type: "GET_ONLEAVE_SUMMARY",
                onLeaveSummary: [],
            });
        }
        } catch (e) {
            console.log(e);
        }
    };
};
// export const changePassword = (accessToken, data) => {
//     return async (dispatch) => {
//         try {
//             let result = await axiosInstanceToken(
//                 "GET",
//                 `user/changePassword/`,
//                 accessToken,data
//             );
//             //// console.log("tene", result.data);
//             // if (result.data != "") {
//            // console.log(result);
//             dispatch({
//                 type: "MSG_CHANGEPASSS",
//                 msgChangePassword: result.data,
//             });
//             // }
//         } catch (e) {
//            // console.log(e);
//         }
//     };
// };

export const loginFingerAction = (lang) => {
    return async (dispatch) => {
        try {
            let checkLogin = await checkLoginFinger(lang);
            // console.log(checkLogin);

            if (checkLogin.status == true) {
                let user = await getToken("user");
                user = JSON.parse(user);
                dispatch({
                    type: "LOGIN_FINGER",
                    user: user,
                    userToken: checkLogin.accessToken,
                });
            } else {
                dispatch({
                    type: "LOGIN_FAIL",
                    messageLoginResponse: checkLogin.msg,
                });
            }
        } catch (e) {
            // console.log(e);
        }
    };
};
/** một chiều cuối thu, nghe nắng trong tâm hồn, một hình bóng ai kia gọi mời, một trái tim vừa mở mời, lại gần anh hơn nữa, nhẹ hôn lên tóc em môi kề môi, những ánh mắt trao nhau ngại ngần, bao dấu yêu đã bao lần, Em, anh chỉ cần mỗi em mà thôi. có chi đâu xa xôi, muốn em hôn lên môi, Em, em vờ như không biết tình anh, là những mong manh, là áng mây xanh, nói anh nghe. Có em bên đời bỗng vui, có thêm đôi tình nhân, có thêm đôi bàn tay ân cần, có em bên đời bỗng vui, về đêm nghe tim mình chợt thao thức nhớ em, nhớ đôi vai gầy, nhớ thân thương này, em hỡi */
