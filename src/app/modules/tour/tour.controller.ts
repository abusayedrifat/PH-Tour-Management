/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourServices, TourTypeServices } from './tour.service';




//todo--> ============= TOUR controller ================================
const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const tour = await TourServices.createTour(req.body)

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: tour,
      })
})

//*================= getAll tour type =====================
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

//*================= getAll tour type =====================
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

//*================= update tour type =====================

const updateTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const id = req.params.id as string
      const payload = req.body
      const updateTour = await TourServices.updateTour(id, payload)
      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
            data: updateTour,
      })
})

//*================= delete tour type =====================
const deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const id = req.params.id as string

      const deleteTour = await TourServices.deleteTour(id)

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "tour type created successfully",
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