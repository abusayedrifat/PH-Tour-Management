
import { GuideStatus, IGuide } from './guides.interface';
import { model, Schema } from "mongoose";

const guideSchema = new Schema<IGuide>({

    user: {
        type:Schema.Types.ObjectId,
        required:true,
        unique:true
    },
    nidPhoto: {
        type:String
    },
    division: {
        type: Schema.Types.ObjectId,
        required:true
    },
    status: {
        type:String,
        enum: Object.values(GuideStatus),
        default: GuideStatus.PENDING
    }
})


export const  Guide = model("Guide", guideSchema)