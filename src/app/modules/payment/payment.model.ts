import { model, Schema } from "mongoose";
import { IPayment, PaymentStatus } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({
    booking:{
        type:Schema.Types.ObjectId,
        ref:"Booking",
        required:true,
        unique:true
    },
    transactionId:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentGateway:{
        type:Schema.Types.Mixed,

    },
    invoiceUrl:{
        type:String,
    },
    status:{
        type: String,
        enum: Object.values(PaymentStatus),
        required:true
    }

},{
    timestamps:true,
    versionKey:false,
})
//*document must have an _id before saving. if i set _id:false, then,

export const Payment = model("Payment", paymentSchema )

