
import { GuideStatus, IGuide } from './guides.interface';
import { model, Schema } from "mongoose";

const guideSchema = new Schema<IGuide>({

    user: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    nidPhoto: {
        type:[String]
    },
    division: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Division"
    },
    status: {
        type:String,
        enum: Object.values(GuideStatus),
        default: GuideStatus.PENDING
    }
},{
    versionKey:false
})


export const  Guide = model("Guide", guideSchema)