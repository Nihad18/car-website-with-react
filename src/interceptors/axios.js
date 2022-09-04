import axios from "axios";

let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        try{
        const response = await axios.post('/api/account/token/refresh/',  {
            refresh: localStorage.getItem('refreshToken'),
            withCredentials: true
        })
        localStorage.setItem('token',response.data.access)
        }
        catch (e) {
            console.log("error", e)
        }
    }
    refresh = false;
    return error;
});