/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHelper/AppError";


 cloudinary.config({
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_CLOUD_API_KEY,
    api_secret: envVars.CLOUDINARY_CLOUD_API_SECRET
})

export const deleteImageFromCloudinary = async (url:string)=>{
    try {
         const regx= /\/([^/]+)\.[^.]+$/; //*  build the regex from AI, simple.
    
    const match = url.match(regx)

    if (match && match[1]) {
        const public_id = match[1]

        await cloudinary.uploader.destroy(public_id)
        console.log(`File ${public_id} is deleted from cloudinary`);
        
    }
    } catch (error:any) {
        throw new AppError(401, "Cloudinary deletion failed" , error.message)
    }
   

}

export const cloudinaryUpload = cloudinary

// console.log(cloudinaryUpload);
