import { model, Schema } from "mongoose";
import { BookingStatus, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tour:{
        type: Schema.Types.ObjectId,
        ref:"Tour",
        required:true
    },
    payment:{
        type:Schema.Types.ObjectId,
        ref:"Payment"
    },
    guest:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(BookingStatus),
        default: BookingStatus.PENDEING
    }
},{
    timestamps:true,
    versionKey:false,
    _id:false
})



export const Booking = model("Booking", bookingSchema )
