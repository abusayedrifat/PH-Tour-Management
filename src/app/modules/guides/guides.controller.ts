/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { GuideServices } from './guides.service';

const applyGuides = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const payload = req.body
    const applyGuide = await GuideServices.applyguides(payload)

    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "Guide application successfull",
          data:applyGuide,
        })
})


const createGuides = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "guide created successfully",
          data: {},
        })
})
const getALLGuides = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "all guides retrived successfully",
          data: {},
        })
})
const getSingleGuide = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "single guide retrived successfully",
          data: {},
        })
})





export const GuideController = {
    createGuides,
applyGuides,
getALLGuides,
getSingleGuide
}