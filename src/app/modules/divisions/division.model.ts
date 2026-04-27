import { model, Schema } from "mongoose";
import { IDivisions } from "./division.interface";


const divisionSchema = new Schema<IDivisions>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: { type: String },
    thumbnail: { type: String }

}, {
    timestamps: true,
    versionKey: false
})


divisionSchema.pre("save", async function () {

    if (this.isModified("name")) {
        const baseSlug = this.name.toLocaleLowerCase().split(" ").join("-")
        let slug = `${baseSlug}-division`
        let counter = 0;

        while (await Division.exists({ slug })) {
            slug = `${slug}-${counter++}`
        }
        this.slug = slug
    }
})


divisionSchema.pre("findOneAndUpdate", async function () {
    const division = this.getUpdate() as IDivisions

    if (division.name) {
        const baseSlug = division.name.toLocaleLowerCase().split(" ").join("-")

        let slug = `${baseSlug}-division`
        let counter = 0;

        while (await Division.exists({ slug })) {
            slug = `${slug}-${counter++}`
        }
        division.slug = slug
    }
})





export const Division = model<IDivisions>("Division", divisionSchema)