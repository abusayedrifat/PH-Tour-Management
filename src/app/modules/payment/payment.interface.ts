/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";


export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCELED = "CANCELED",
    FAILED = "FAILED",
    REFUND = "REFUND"

}

export interface IPayment {
    booking: Types.ObjectId,
    transactioId: string,
    amount: number,
    paymentGateway: any,
    invoiceUrl?: string,
    status: PaymentStatus

}