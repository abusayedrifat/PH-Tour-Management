/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelper/AppError";
import { IDivisions } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivisions) => {
    // const { name, ...rest } = payload
    const isDivisionExists = await Division.findOne({ name: payload.name })

    if (isDivisionExists) {
      throw new AppError(httpStatus.BAD_REQUEST, "this division does not exists", "")
    }


    const division = await Division.create(payload)
    console.log(division);
    

    return division
}


const getAllDivision = async () => {
    const allDivisions = await Division.find({})
    const totalDivisions = await Division.countDocuments()
    return {
        data: allDivisions,
        meta: {
            count: totalDivisions
        }
    }
}


const updateDivision = async (id: string, payload: Partial<IDivisions>) => {
    const isDivisionExists = await Division.findById(id)

    if (!isDivisionExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "this division does not exists", "")
    }

    const duplicateDivision = await Division.findOne({
        _id: { $ne: id },
        name: payload.name
    })

    if (duplicateDivision) {
        throw new AppError(httpStatus.BAD_REQUEST, "this division does not exists", "")
    }

    const updateDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    return updateDivision
}


const deleteDivision = async (id: string) => {
    const isDivisionExists = await Division.findById(id)
    if (!isDivisionExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "this division does not exists", "")
    }

    await Division.findByIdAndDelete(id)

    return null
}

export const DivisionServices = {
    createDivision,
    getAllDivision,
    updateDivision,
    deleteDivision
}