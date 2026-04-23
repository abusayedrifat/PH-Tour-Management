/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelper/AppError";
import { clearCookies, setAuthCookie } from "../../utils/Cookies";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/tokens";
import { envVars } from "../../config/env";
import passport from "passport";

const credentialsLogIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    // const clientLogInInfo = await AuthServices.crendentialsLogIn(req.body);

    passport.authenticate("local", async (err: any, user: any, info: any) => {


      if (err) {

        return next(new AppError(401, err.message, ''))
      }

      if (!user) {
        return next(new AppError(401, info.message, ''))
      }

      const userTokens = createUserTokens(user);

    const { password: pass, ...rest } = user.toObject();

      setAuthCookie(res, userTokens)

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user loggedIn successfully",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest
        }
      });

    })(req, res, next)




  },
);


const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, 'refresh token not found', '')

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

//*==============logout================================
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

//*=================== reset password ===================

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: "password reseted successfully",
      data: null,
    });
  },
);


//*=================== google log In ===================
const googleCallBackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    //todo-> redirectTo
    let redirectTo = req.query.state ? req.query.state as string : ""
    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1)
    }

    const user = req.user;

    console.log("google autentication logIn", user);

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user not found', '')
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    //   success: true,
    //   statusCode: httpStatus.ACCEPTED,
    //   message: "password reseted successfully",
    //   data: null,
    // });

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
  },
);

export const AuthControllers = {
  credentialsLogIn,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallBackController
};
