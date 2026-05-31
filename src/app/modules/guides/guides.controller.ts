/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { GuideServices } from './guides.service';
import { IGuide } from './guides.interface';

const applyGuides = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const payload:IGuide = {
      ...req.body,
    nidPhoto:(req.files as Express.Multer.File[]).map(file=>file.path)
    }
    console.log("payload from guidescontroller", payload);
    
    const applyGuide = await GuideServices.applyguides(payload)

    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "Guide application successfull",
          data:applyGuide,
        })
})


const getALLGuidesApplicants = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const query = req.query as Record<string, string>
  const allGuides = await GuideServices.getALLGuidesApplicants(query)
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "all guides retrived successfully",
          data: allGuides,
        })
})


const approveAsGuide = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const id = req.params.id as string
  const {status} =  req.body

  console.log('from gudis controller',id,status);
  

  const approvedAsGuide = await GuideServices.approveAsGuide(id,status)
    sendResponse(res, {
          success: true,
          statusCode: httpStatus.CREATED,
          message: "guide created successfully",
          data: approvedAsGuide,
        })
})







export const GuideController = {
    approveAsGuide,
applyGuides,
getALLGuidesApplicants
}