import Cookie from "js-cookie"

const SetCookie = (cookiename,value)=>{
    Cookie.set(cookiename,value,{
        expires: 7,
        secure:true,
        sameSite:"strict",
        path: "/",
    })
}

export default SetCookie