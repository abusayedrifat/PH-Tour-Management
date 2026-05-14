/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourServices, TourTypeServices } from './tour.service';
import { ITour } from './tour.interface';
import AppError from '../../errorHelper/AppError';




//todo--> ============= TOUR controller ================================
const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const payload: ITour = {
            ...req.body,
            images: (req.files as Express.Multer.File[]).map(file=> file.path)
      }
      console.log('from controller',payload);
      
      const tour = await TourServices.createTour(payload)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tour,
      })
})

//*================= getAll tour  =====================
const getAllTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const query = req.query as Record<string, string>
      const allTour = await TourServices.getAllTour(query)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour retrived successfully",
            data: allTour,
      })
})

//*================= getAll tour  =====================
const getSingleTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const query = req.params.slug  as string
      const singleTour = await TourServices.getSingleTour(query)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour retrived successfully",
            data: singleTour,
      })
})

//*================= update tour  =====================

const updateTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const id = req.params.id as string
      const payload: ITour = {
            ...req.body,
            images:(req.files as Express.Multer.File[]).map(file=> file.path)
      }
      console.log("payload from TourController",payload);
      
      const updateTour = await TourServices.updateTour(id, payload)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: updateTour,
      })
})

//*================= delete tour  =====================
const deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const id = req.params.id as string

      const deleteTour = await TourServices.deleteTour(id)

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "tour deleted successfully",
            data: deleteTour,
      })
})


//todo-->=================== TOUR TYPE controller =============
const createTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const tourType = await TourTypeServices.createTourType(req.body)

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tourType,
      })
})

//*================= getAll tour type =====================
const getAllTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const allTourType = await TourTypeServices.getAllTourType()
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: allTourType,
      })
})

//*================= update tour type =====================

const updateTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const id = req.params.id as string;
      const paylaod = req.body

      const updateTourType = await TourTypeServices.updateTourType(id, paylaod)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: updateTourType,
      })
})

//*================= delete tour type =====================
const deleteTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id as string;

      const deleteTourType = await TourTypeServices.deleteTourType(id)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: deleteTourType,
      })
})


export const TourController = {
      createTourType,
      getAllTourType,
      updateTourType,
      deleteTourType,
      createTour,
      getAllTour,
      updateTour,
      deleteTour,
      getSingleTour
}