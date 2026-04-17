/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from './auth.service';

const credentialsLogIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const clientLogInInfo = await AuthServices.crendentialsLogIn(req.body) 
    

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user loggedIn successfully",
      data: clientLogInInfo,
    });
   
  },
);

export const AuthControllers = {
    credentialsLogIn
}