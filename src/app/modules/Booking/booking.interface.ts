

//* user -> booking(pending) -> payment(unpaid) -> sslzcommerz -> booking update = payment(paid) -> booking(confirmed)

import { Types } from "mongoose";

export enum BookingStatus{
    PENDEING ="PENDING",
    COMPLETED = "COMPLETED",
    CENCELED = "CANCELED",
    FAILED = "FAILED"
}

export interface IBooking {
    user: Types.ObjectId;
    tour:Types.ObjectId;
    payment?:Types.ObjectId;
    guest: number;
    status: BookingStatus
}