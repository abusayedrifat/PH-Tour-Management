import  httpStatus  from 'http-status-codes';



//todo================ TOUR SERVICES ================

import AppError from "../../errorHelper/AppError";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async(payload:ITour)=>{

    const {title} = payload
    const isTourexists = await Tour.findOne({title}) 

    if (isTourexists) {
        throw new AppError(httpStatus.BAD_REQUEST," this Tour already exists",'')
    }

    let slug = payload.title.toLocaleLowerCase().split(" ").join("-")
    
    let counter = 0;
    while (await Tour.exists({slug})) {
        slug = `${slug}-${counter++}`
    }

    payload.slug = slug

    const createTour = await Tour.create(payload)

  return {
    createTour
  }
}


const getAllTour = async() =>{

    const getAllTour = await Tour.find({})
    const totalTour = await Tour.countDocuments()

    return {
        data: getAllTour,
        meta:{
            count: totalTour
        }
    }
}


const updateTour = async(id:string, payload:Partial<ITour>) =>{
    const isTourexists = await Tour.findById({id})
    if (!isTourexists) {
        throw new AppError(httpStatus.BAD_REQUEST," this Tour does not exists",'')
    }

    

    const updateTour = await Tour.findByIdAndUpdate(payload)

    return updateTour
}



export const TourServices = {
    createTour,
    getAllTour,
    updateTour 
}



//todo================ TOUR TYPE SERVICES ===========