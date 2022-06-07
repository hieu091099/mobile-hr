import axios from "axios";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
import { useSelector } from "react-redux";
import { multilang } from "./language/multilang";

// export const BASE_URL = "http://erp.lacty.com.vn:8000/";
export const BASE_URL = "http://192.168.18.172:8000/";

export const getToken = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        // console.log(e);
    }
};

export const setToken = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        // console.log(e);
    }
};
export const getExpoPushNoti = async () => {
    let token = await (await Notifications.getExpoPushTokenAsync()).data;
    await setToken("expoPushToken", token);
    return token;
};
export const deleteToken = async (key) => {
    try {
        const value = await SecureStore.deleteItemAsync(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        // console.log(e);
    }
};
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export const axiosInstanceToken = async (method, url, accessToken, data) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
            // "x-access-token": !isExp ? accessToken : accessTokenFromDevice,
            "x-access-token": accessToken,
        },
    });

    if (method == "GET") {
        try {
            return await instance.get(url);
        } catch (error) {
            // console.log(error);
        }
    }
    if (method == "POST") {
        try {
            return await instance.post(url, data);
        } catch (error) {
            // console.log(error);
        }
    }
    if (method == "PUT") {
        try {
            return await instance.put(url, data);
        } catch (error) {
            // console.log(error);
        }
    }

    if (method == "DELETE") {
        try {
            return await instance.delete(url);
        } catch (error) {
            // console.log(error);
        }
    }
};

export const checkLoginFinger = async (lang) => {
    let accessToken = await getToken("accessToken");
    let refreshToken = await getToken("refreshToken");
    if (accessToken) {
        const decoded = jwt_decode(accessToken);
        const current_time = new Date().getTime() / 1000;
        if (current_time >= decoded.exp) {
            try {
                const body = {
                    accessToken,
                    refreshToken,
                };
                const res = await axios({
                    method: "POST",
                    url: `${BASE_URL}auth/refresh`,
                    data: body,
                });
                if (res.data.authenticated == false) {
                    if (res.data.key == 1) {
                        return {
                            status: false,
                            msg: "dangNhapVanTayChiCoTheSuDungTrong7NgayKeTuNgayDangNhapBangMatKhauVuiLongDangNhapBangMatKhauDeTaiKichHoatChucNang",
                        };
                    } else {
                        return {
                            status: false,
                            msg: "taiKhoanDaDuocDangNhapTu1ThietBiKhacVuiLongDangNhapLaiDeTaiKichHoatChucNang",
                        };
                    }
                } else {
                    await setToken("accessToken", res.data.accessToken);
                    return { status: true, accessToken: res.data.accessToken };
                }
            } catch (e) {
                // console.log(e);
            }
        } else {
            return { status: true, accessToken: accessToken };
        }
    }
};

export const checkTokenExpired = async () => {
    let accessToken = await getToken("accessToken");
    if (accessToken) {
        const decoded = jwt_decode(accessToken);
        const current_time = new Date().getTime() / 1000;
        //// console.log(current_time, decoded.exp)
        if (current_time >= decoded.exp) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return -1;
    }
};

export const renderMonth3Lang = (lang, num) => {
    const monthLang = {
        vi: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        en: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        tw: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
        ],
    };
    return <>{monthLang[lang][parseInt(num) - 1]}</>;
};
