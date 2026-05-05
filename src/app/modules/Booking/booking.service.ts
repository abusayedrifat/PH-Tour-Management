import  httpStatus  from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import { BookingStatus, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PaymentStatus } from "../payment/payment.interface";

const getTransactionId = () => {
    const date = Date.now();
    const randomHexNum = Math.floor(Math.random() * 0x10000000000)
        .toString(16)
        .padStart(10, "0")
        .toUpperCase();
    return `tran_${date}_${randomHexNum}`;
};

const createBooking = async (payload: Partial<IBooking>, userID: string) => {
    const user = await User.findById(userID);
    const  transactionId = getTransactionId()

    if (!user?.phone || !user.address) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "kindly update ur phone number and address at ur profile",
            "",
        );
    }
    const booking = Booking.create({
        user: userID,
        status: BookingStatus.PENDEING,
        ...payload,
    });

    const payment = await Payment.create({
        booking: (await booking)._id,
        status: PaymentStatus.UNPAID,
        transactionId: transactionId

    })

    return booking;
};

export const BookingServices = {
    createBooking,
};
