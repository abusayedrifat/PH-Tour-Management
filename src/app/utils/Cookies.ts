import { Response } from "express";


interface AuthToken{
    accessToken?:string,
    refreshToken?:string
}

export const setAuthCookie = (res:Response, tokenInfo:AuthToken)=> {

    res.cookie("accessToken", tokenInfo.accessToken ,{
        httpOnly: true,
        secure:true
    })
    res.cookie("refreshToken", tokenInfo.refreshToken ,{
        httpOnly: true,
        secure:true
    })
}


export const clearCookies = (res:Response)=>{
    res.cookie("accessToken", {
        httpOnly: true,
        secure:false,
        sameSite:'lax'
    })
    res.cookie("refreshToken",{
        httpOnly: true,
        secure:false,
        sameSite:'lax'
    })
}
