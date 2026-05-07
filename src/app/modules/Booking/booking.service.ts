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
console.log("Phone:", user?.phone);
console.log("Address:", user?.address);
  if (!user?.phone || !user?.address) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Kindly update your phone number and address in your profile",
      "",
    );
  }

  const tour = await Tour.findById(payload.tour).select("costFrom");

  // ✅ Fixed: was missing the `!`
  if (!tour?.costFrom) {
    throw new AppError(httpStatus.BAD_REQUEST, "costFrom not found", "");
  }

  const amount = (tour.costFrom as number) * (payload.guest as number);

  const booking = await Booking.create({
    user: userID, // ✅ Always use the authenticated userID
    status: BookingStatus.PENDEING,
    ...payload,
  });

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
// const createBooking = async (payload: Partial<IBooking>, id: string) => {
//     const user = await User.findById(id);
//     console.log('from booking',user);
    
//     const  transactionId = getTransactionId()

//     if (!user?.phone || !user?.address) {
//         throw new AppError(
//             httpStatus.BAD_REQUEST,
//             "kindly update ur phone number and address at ur profile",
//             "",
//         );
//     }
//     const tour = await Tour.findById(payload.tour).select("costFrom")

//     if (!tour?.costFrom) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'costFfrom not found','')
//     }



//     const amount = (tour?.costFrom as number) * (payload.guest as number)

//     const booking = await Booking.create({
//         user: id,
//         status: BookingStatus.PENDEING,
//         ...payload,
//     });

//     const payment = await Payment.create({
//         booking: booking._id,
//         status: PaymentStatus.UNPAID,
//         transactionId: transactionId,
//         amount: amount

//     })
//     const updateBooking = await Booking.findByIdAndUpdate(
//         booking._id,
//         {payment: payment._id},
//         { new:true, runValidators:true}
//     )

//     return updateBooking
// };


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
