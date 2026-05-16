/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OTPservices } from './otp.service';

const sendOTP = catchAsync(async(req: Request,res:Response,next:NextFunction)=>{

    const {name, email} = req.body
    await OTPservices.sendOTP(name, email)
    sendResponse(res,{
       success: true,
          statusCode: httpStatus.ACCEPTED,
          message: "OTP sent successfully",
          data: {}, 
    })
})
const verifyOTP = catchAsync(async(req: Request,res:Response,next:NextFunction)=>{

    const {email, otp} = req.body
    await OTPservices.verifyOTP(email, otp)
    sendResponse(res,{
       success: true,
          statusCode: httpStatus.ACCEPTED,
          message: "OTP verified successfully",
          data: {}, 
    })
})



export const otpContollers = {
    sendOTP,
    verifyOTP
}