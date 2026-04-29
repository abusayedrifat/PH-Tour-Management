/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";

//todo================ TOUR SERVICES ================

import AppError from "../../errorHelper/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { excludedFields, searchFields } from "../../utils/constants";

const createTour = async (payload: ITour) => {
    const { title } = payload;
    const isTourexists = await Tour.findOne({ title });

    if (isTourexists) {
        throw new AppError(httpStatus.BAD_REQUEST, " this Tour already exists", "");
    }

    const createTour = await Tour.create(payload);

    return {
        createTour,
    };
};

const getAllTour = async (query: Record<string, string>) => {
    console.log("from service getAlltour", query);

    const filter = query
    const searchTerm = query.searchTerm || " ";
    const sort = query.sort || "-createdAt";
    const fields = query.fields.split(",").join(" ").split("-").join(" ")|| " ";
    console.log(filter);

    

    for(const field of excludedFields){
        delete filter[field]
    }


    const queryField = {
        $or: searchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    };
    
    

    //* Search = fuzzy match(regex)
    //* Filter = exact match

    const getAllTour = await Tour.find(queryField).find(filter).sort(sort).select(fields)
    const totalTour = await Tour.countDocuments();

    return {
        data: getAllTour,
        meta: {
            count: totalTour,
        },
    };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
    const isTourexists = await Tour.findById({ id });
    if (!isTourexists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            " this Tour does not exists",
            "",
        );
    }

    const updateTour = await Tour.findByIdAndUpdate(payload);

    return updateTour;
};

const deleteTour = async (id: string) => {
    const isTourexists = await Tour.findById({ id });

    if (!isTourexists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            " this Tour does not exists",
            "",
        );
    }

    const deleteTour = await Tour.findByIdAndDelete(id);

    return deleteTour;
};

export const TourServices = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
};

//todo================ TOUR TYPE SERVICES ===========

const createTourType = async (payload: ITourType) => {
    const { name } = payload;
    const isTourexists = await Tour.findOne({ name });

    if (isTourexists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            " this Tour Type already exists",
            "",
        );
    }

    const tourType = await TourType.create(payload);

    return tourType;
};

const getAllTourType = async () => {
    const getAllTourType = await TourType.find({});
    const totalTourType = await TourType.countDocuments();

    return {
        data: getAllTourType,
        meta: {
            count: totalTourType,
        },
    };
};

const updateTourType = async (id: string, payload: Partial<ITour>) => {
    const isTourexists = await Tour.findById({ id });
    if (!isTourexists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            " this Tour does not exists",
            "",
        );
    }

    const updateTourType = await Tour.findByIdAndUpdate(payload);

    return updateTourType;
};

const deleteTourType = async (id: string) => {
    const isTourexists = await Tour.findById({ id });

    if (!isTourexists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            " this Tour Type does not exists",
            "",
        );
    }

    const deleteTourType = await Tour.findByIdAndDelete(id);

    return deleteTourType;
};

export const TourTypeServices = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
};
