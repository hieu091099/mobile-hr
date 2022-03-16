import { useNavigation } from "@react-navigation/native";
import { axiosInstance, setToken } from "../../config"


export const loginAction = (userLogin, navigation) => {

    return async (dispatch) => {
        try {
            let result = await axiosInstance.post('user/login', userLogin);
            if (result.data.authenticated == true) {
                await setToken("accessToken", JSON.stringify(result.data.accessToken));
                await setToken("user", JSON.stringify(result.data.user));

                dispatch({
                    type: 'LOGIN',
                    user: result.data.user,
                    userToken: result.data.accessToken
                })
                navigation.navigate('Home');
            } else {
                console.log(result.data.message);
            }
        } catch (e) {
            console.log(e)
        }

    }
}
/** một chiều cuối thu, nghe nắng trong tâm hồn, một hình bóng ai kia gọi mời, một trái tim vừa mở mời, lại gần anh hơn nữa, nhẹ hôn lên tóc em môi kề môi, những ánh mắt trao nhau ngại ngần, bao dấu yêu đã bao lần, Em, anh chỉ cần mỗi em mà thôi. có chi đâu xa xôi, muốn em hôn lên môi, Em, em vờ như không biết tình anh, là những mong manh, là áng mây xanh, nói anh nghe. Có em bên đời bỗng vui, có thêm đôi tình nhân, có thêm đôi bàn tay ân cần, có em bên đời bỗng vui, về đêm nghe tim mình chợt thao thức nhớ em, nhớ đôi vai gầy, nhớ thân thương này, em hỡi */