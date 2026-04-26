import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tourType,
      })
})

//*================= getAll tour type =====================
const getAllTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tourType,
      })
})

//*================= update tour type =====================

const updateTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tourType,
      })
})

//*================= delete tour type =====================
const deleteTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tourType,
      })
})


export const TourController = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}