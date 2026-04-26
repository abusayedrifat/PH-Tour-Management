/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DivisionServices } from './division.service';


const createDivision = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

  const division = await DivisionServices.createDivision(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "division created successfully",
      data: division,
    })
})


//*================= getAll division =====================

const getALlDivision = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

  const allDivision = DivisionServices.getAllDivision()

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user retrived successfully",
      data: allDivision,
    })
})


//*================= update division =====================

const updateDivision = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

  const id = req.params.id as string
  const payload = req.body
  const updateDivision = DivisionServices.updateDivision(id , payload)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user updated successfully",
      data: updateDivision,
    })
})


//*================= delete division =====================

const deleteDivision = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{


  const id = req.params.id as string
  const deleteDivision = DivisionServices.deleteDivision(id)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user deleted successfully",
      data: deleteDivision,
    })
})


export const DivisionController = {
    createDivision,
    getALlDivision,
    updateDivision,
    deleteDivision
}