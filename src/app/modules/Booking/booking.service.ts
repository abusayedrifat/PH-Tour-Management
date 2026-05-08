import  httpStatus  from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import { BookingStatus, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PaymentStatus } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";

const getTransactionId = () => {
    const date = Date.now();
    const randomHexNum = Math.floor(Math.random() * 0x10000000000)
        .toString(16)
        .padStart(10, "0")
        .toUpperCase();
    return `tran_${date}_${randomHexNum}`;
};

const createBooking = async (payload: Partial<IBooking>, userID: string) => {
  const transactionId = getTransactionId();

  // Use userID from token, not from payload
  const user = await User.findById(userID);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'user not matched.kindly logOut and logIn again','')
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

  const booking = await Booking.create({
    user: userID,
    status: BookingStatus.PENDEING,
    ...payload
  });

  console.log('from booking creating',booking.user);
  

  const payment = await Payment.create({
    booking: booking._id,
    status: PaymentStatus.UNPAID,
    transactionId: transactionId,
    amount: amount,
  });

  const updateBooking = await Booking.findByIdAndUpdate(
    booking._id,
    { payment: payment._id },
    { new: true, runValidators: true }
  );

  return updateBooking;
};


const getAllBooking = async() =>{
    const allBooking = await Booking.find({})
    return allBooking
}
const getSingleBooking = async(id:string) =>{

    const singleBooking = await Booking.findById({id})
    return singleBooking
}
const getUserBooking = async(id:string) =>{

    const userBooking = await Booking.findById({id})
    return userBooking
}




export const BookingServices = {
    createBooking,
    getAllBooking,
    getSingleBooking,
    getUserBooking

};
