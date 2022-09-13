import Cookie from "js-cookie"

const RemoveCookie = (cookiename,value)=>{
    Cookie.remove(cookiename)
}

export default RemoveCookie