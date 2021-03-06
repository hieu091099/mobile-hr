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
/** m???t chi???u cu???i thu, nghe n???ng trong t??m h???n, m???t h??nh b??ng ai kia g???i m???i, m???t tr??i tim v???a m??? m???i, l???i g???n anh h??n n???a, nh??? h??n l??n t??c em m??i k??? m??i, nh???ng ??nh m???t trao nhau ng???i ng???n, bao d???u y??u ???? bao l???n, Em, anh ch??? c???n m???i em m?? th??i. c?? chi ????u xa x??i, mu???n em h??n l??n m??i, Em, em v??? nh?? kh??ng bi???t t??nh anh, l?? nh???ng mong manh, l?? ??ng m??y xanh, n??i anh nghe. C?? em b??n ?????i b???ng vui, c?? th??m ????i t??nh nh??n, c?? th??m ????i b??n tay ??n c???n, c?? em b??n ?????i b???ng vui, v??? ????m nghe tim m??nh ch???t thao th???c nh??? em, nh??? ????i vai g???y, nh??? th??n th????ng n??y, em h???i */
