import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const BASE_URL = "http://192.168.0.63:8000/";


export const getToken = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(e);
    }
};

export const setToken = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.log(e);
    }
};

export const deleteToken = async (key) => {
    try {
        const value = await SecureStore.deleteItemAsync(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(e);
    }
};
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export const axiosInstanceToken = async (method, url, accessToken, data) => {
    let isExp = false;
    let refreshToken = await getToken("refreshToken");

    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const current_time = new Date().getTime() / 1000;

        if (current_time >= decoded.exp) {
            try {
                const body = {
                    accessToken,
                    refreshToken: refreshToken,
                };
                const res = await axios({
                    method: "POST",
                    url: `${BASE_URL}auth/refresh`,
                    data: body,
                });
                await setToken("accessToken", res.data.accessToken);
                isExp = true;
            } catch (e) {
                console.log(e);
            }
        }
    }

    let accessTokenFromDevice = await getToken("accessToken");
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
            "x-access-token": !isExp ? accessToken : accessTokenFromDevice,
        },
    });

    if (method == "GET") {
        try {
            return await instance.get(url);
        } catch (error) {
            console.log(error);
        }
    }
    if (method == "POST") {
        try {
            return await instance.post(url, data);
        } catch (error) {
            console.log(error);
        }
    }
    if (method == "PUT") {
        try {
            return await instance.put(url, data);
        } catch (error) {
            console.log(error);
        }
    }

    if (method == "DELETE") {
        try {
            return await instance.delete(url);
        } catch (error) {
            console.log(error);
        }
    }
};


