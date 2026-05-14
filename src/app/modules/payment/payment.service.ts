/* eslint-disable @typescript-eslint/no-explicit-any */
import  httpStatus  from 'http-status-codes';
import AppError from "../../errorHelper/AppError";
import { BookingStatus } from "../Booking/booking.interface";
import { Booking } from "../Booking/booking.model";
import { PaymentStatus } from "./payment.interface";
import { Payment } from "./payment.model";
import { sslService } from '../sslcommerz/sslcommerz.service';
import { ISSLcommerz } from '../sslcommerz/sslcommerz.interface';


const initPayment = async (bookingId: string) => {

    const payment = await Payment.findOne({booking:bookingId})
    if (!bookingId) {
        throw new AppError(httpStatus.BAD_REQUEST, 'booking & payment not found','')
    }
console.log(payment);


    const booking = await Booking.findById(payment?.booking)
console.log(booking);

      
    const userAddress = (booking?.user as any).address
    const userEmail = (booking?.user as any).email
    const userPhoneNumber = (booking?.user as any).phone
    const userName = (booking?.user as any).name

    const sslPayload: ISSLcommerz = {
        address: userAddress,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        name: userName,
        amount: payment?.amount as number,
        transactionId: payment?.transactionId as string
    }
      

      const sslPayment= await sslService.sslPaymentInit(sslPayload)
  
return{
    paymentUrl: sslPayment.GatewayPageURL
}
}
const paymentSuccess = async (query: Record<string, string>) => {

    const session = await Booking.startSession()
    session.startTransaction()

    try {

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PaymentStatus.PAID,
        },
            { new: true, runValidators: true, session: session });


        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BookingStatus.COMPLETED },
            { new: true, runValidators: true, session }
        )


        await session.commitTransaction()
        session.endSession()

        return { success: true, message: "Payment completed successfully" }
    }catch (error:any) {
    
    await session.abortTransaction()
    session.endSession()

    throw error
  }

}


const paymentCancel = async (query: Record<string, string>) => {

   const session = await Booking.startSession()
    session.startTransaction()

    try {

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, 
            {
            status: PaymentStatus.CANCELED,

        },{ runValidators: true, session: session });


        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BookingStatus.CENCELED },
            { runValidators: true, session }
        )


        await session.commitTransaction()
        session.endSession()

        return { success: false, message: "Payment Cancelled" }
    }catch (error:any) {
    
    await session.abortTransaction()
    session.endSession()

    throw error
  }

}


const paymentFailed = async (query: Record<string, string>) => {

  
   const session = await Booking.startSession()
    session.startTransaction()

    try {

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, 
            {
            status: PaymentStatus.FAILED,

        },{ runValidators: true, session: session });


        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BookingStatus.FAILED },
            { runValidators: true, session }
        )


        await session.commitTransaction()
        session.endSession()

        return { success: false, message: "Payment failed" }
    }catch (error:any) {
    
    await session.abortTransaction()
    session.endSession()

    throw error
  }
}


export const PayemntServices = {
    paymentSuccess,
    paymentCancel,
    paymentFailed,
    initPayment
}