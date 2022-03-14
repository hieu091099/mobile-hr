import axios from "axios";
export const Baseurl = 'http://192.168.18.14:9000/';

export const login = async (manv, pass) => {

    try {
        let rs = await axios({
            url: Baseurl + "user/login",
            data: {
                "userId": manv,
                "password": pass
            },
            method: 'POST',

        });
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}