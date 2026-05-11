/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { PayemntServices } from './payment.service';
import { envVars } from '../../config/env';
import { sendResponse } from '../../utils/sendResponse';

const initPayment = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const bookingId = req.params.bookingId as string
    const result = await PayemntServices.initPayment(bookingId)

    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "division created successfully",
          data: result,
        })
 
})
const paymentSuccess = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const query = req.query as Record<string, string>
    const result = await PayemntServices.paymentSuccess(query)
    
    if (result.success) {
        res.redirect(`${envVars.SSLCOMMERZ_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&${query.status}`)
    }
 
})

const paymentFailed = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
   const query = req.query as Record<string, string>
    const result = await PayemntServices.paymentFailed(query)
    
    if (!result.success) {
        res.redirect(`${envVars.SSLCOMMERZ_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&${query.status}`)
    } 
    
    
})


const paymentCancel = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const query = req.query as Record<string, string>
    const result = await PayemntServices.paymentCancel(query)
    
    if (!result.success) {
        res.redirect(`${envVars.SSLCOMMERZ_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&${query.status}`)
    }
    
  
})




export const PaymentController = {
    paymentCancel,
    paymentFailed,
    paymentSuccess,
    initPayment
}