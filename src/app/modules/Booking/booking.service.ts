
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import { BookingStatus, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PaymentStatus } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { sslService } from "../sslcommerz/sslcommerz.service";

const getTransactionId = () => {
  const date = Date.now();
  const randomHexNum = Math.floor(Math.random() * 0x10000000000)
    .toString(16)
    .padStart(10, "0")
    .toUpperCase();
  return `tran_${date}_${randomHexNum}`;
};


//*In Mongoose, the primary way to achieve a "rollback" is by using "Transactions". This allows you to group multiple database operations together so that either all of them succeed or none of them do.
//*Execute Operations: Pass the session object to every Mongoose operation (e.g., save, create, update)

const createBooking = async (payload: Partial<IBooking>, userID: string) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession()

  session.startTransaction()

  try {

    //* Use userID from token, not from payload
    const user = await User.findById(userID);

    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "user not matched.kindly logOut and logIn again",
        "",
      );
    }
    if (!user?.phone || !user?.address) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Kindly update your phone number and address in your profile",
        "",
      );
    }

    const tour = await Tour.findById(payload.tour).select("costFrom");

    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "costFrom not found", "");
    }

    const amount = (tour.costFrom as number) * (payload.guest as number);

    const booking = await Booking.create([{
      user: userID,
      status: BookingStatus.PENDEING,
      ...payload,
    }], {session})


    const payment = await Payment.create([{
      booking: booking[0]._id,
      status: PaymentStatus.UNPAID,
      transactionId: transactionId,
      amount: amount,
    }],{session});

    const updateBooking = await Booking.findByIdAndUpdate(
        booking[0]._id,
        { 
        payment: payment[0]._id 
      },
      { new: true, runValidators: true ,session},
      
    ).populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment")

      const userName = ( updateBooking?.user as any).name
      const userEmail = ( updateBooking?.user as any).email
      const userPhoneNumber = ( updateBooking?.user as any).phone
      const userAddress= ( updateBooking?.user as any).address

      const sslPayload = {
         name: userName,
        email:userEmail ,
        address: userAddress,
        phoneNumber: userPhoneNumber,
        amount: amount,
        transactionId:transactionId ,
      }

      const sslPayment= await sslService.sslPaymentInit(sslPayload)
      console.log(sslPayment);
      

      await session.commitTransaction()
      session.endSession()


    return {
      booking: updateBooking,
      paymentUrl: sslPayment.GatewayPageURL
    }

  } catch (error:any) {
    
    await session.abortTransaction()
    session.endSession()

    throw error
  }


};

const getAllBooking = async () => {
  const allBooking = await Booking.find({});
  return allBooking;
};
const getSingleBooking = async (id: string) => {
  const singleBooking = await Booking.findById({ id });
  return singleBooking;
};
const getUserBooking = async (id: string) => {
  const userBooking = await Booking.findById({ id });
  return userBooking;
};

export const BookingServices = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  getUserBooking,
};
