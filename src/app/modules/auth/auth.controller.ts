/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelper/AppError";
import { clearCookies, setAuthCookie } from "../../utils/Cookies";

const credentialsLogIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const clientLogInInfo = await AuthServices.crendentialsLogIn(req.body);
    console.log(clientLogInInfo);
    

    setAuthCookie(res, clientLogInInfo)

    // res.cookie("refreshToken", clientLogInInfo.refreshToken,{
    //   httpOnly:true,
    //   secure:false,

    // })
    // res.cookie("accessToken", clientLogInInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false,

    // })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user loggedIn successfully",
      data: clientLogInInfo,
    });
  },
);


const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken
     if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, 'refresh token not found','')

     }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user loggedIn successfully",
      data: tokenInfo,
    });
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

  
    clearCookies(res)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: "user logged out successfully",
      data: null,
    });
  },
);

export const AuthControllers = {
  credentialsLogIn,
  getNewAccessToken,
  logout
};
