import httpStatus from 'http-status-codes';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { BookingServices } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';

//*================== create booking =======================
const createBooking = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user as  JwtPayload
    console.log('from booking controller',decodedToken);
    
    const booking = await BookingServices.createBooking(req.body, decodedToken.id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division updated successfully",
        data: booking
    })
}))



//*================== get all booking =======================
const getAllBooking = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const booking = await BookingServices.getAllBooking()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division updated successfully",
        data: booking
    })
}))
//*================== get single booking =======================
const getSingleBooking = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string
    const booking = await BookingServices.getSingleBooking(id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division updated successfully",
        data: booking
    })
}))
//*================== get user booking =======================
const getUserBooking = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.body
    const booking = await BookingServices.getUserBooking(decodedToken)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division updated successfully",
        data: booking
    })
}))



// //*================== update booking =======================
// const updateBooking = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     const booking = await BookingServices.createBooking(req.body)
//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "division updated successfully",
//         data: booking
//     })
// }))



// //*================== delete booking =======================
// const deleteBooking = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     const booking = await BookingServices.createBooking(req.body)
//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "division updated successfully",
//         data: booking
//     })
// }))


export const BookingController = {
    createBooking,
    getAllBooking,
    getSingleBooking,
    getUserBooking,
    // updateBooking,
    // deleteBooking
}