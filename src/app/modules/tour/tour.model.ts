import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";


const tourTypeSchema = new Schema<ITourType>({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})



const tourSchema = new Schema<ITour>({

    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    images: {
        type: [String],
        default: []
    },
    location: {
        type: String,
    },
    costFrom: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: String
    },
    included: {
        type: [String],
        default: []
    },
    excluded: {
        type: [String],
        default: []
    },
    amenities: {
        type: [String],
        default: []
    },
    tourPlan: {
        type: [String],
        default: []
    },
    maxGuest: {
        type: Number
    },
    minAge: {
        type: Number
    },
    departureLoacation: {
        type: String
    },
    arriveLocation: {
        type: String
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    },
    divisions: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})


//*==================== pre & post hooks ==============

tourSchema.pre("save", async function () {

    if (this.isModified("title")) {
        let slug = this.title.toLocaleLowerCase().split(" ").join("-")

        let counter = 0;
        while (await Tour.exists({ slug })) {
            slug = `${slug}-${counter++}`
        }

        this.slug = slug
    }

})

tourSchema.pre("findOneAndUpdate", async function(){
    const tour = this.getUpdate() as ITour

    if (tour.title) {
        let slug = tour.title.toLocaleLowerCase().split(" ").join("-")

        let counter = 0;
        while (await Tour.exists({ slug })) {
            slug = `${slug}-${counter++}`
        }

        tour.slug = slug
    }
    
})



export const TourType = model<ITourType>("TourType", tourTypeSchema)
export const Tour = model<ITour>("Tour", tourSchema)