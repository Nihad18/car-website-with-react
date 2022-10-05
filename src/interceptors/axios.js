import axios from "axios";
import SetCookie from "../hooks/SetCookie";
import GetCookie from "../hooks/GetCookie";

let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        try{
        const response = await axios.post('https://ayxan0314.pythonanywhere.com/api/account/token/refresh/',  {
            // refresh: localStorage.getItem('refreshToken'),
            refresh: GetCookie('refreshToken'),
            withCredentials: true
        })
        // localStorage.setItem('token',response.data.access)
        SetCookie('token',response.data.access)
        }
        catch (e) {
            console.log("error", e)
        }
    }
    refresh = false;
    return error;
});