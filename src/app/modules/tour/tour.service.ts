
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";

//todo================ TOUR SERVICES ================

import AppError from "../../errorHelper/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { searchFields } from "../../utils/constants";
import { QueryBuilder } from "../../utils/queryBuilder";




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

    // const filter = query
    // const searchTerm = query.searchTerm || " ";
    // const sort = query.sort || "-createdAt";
    // const page = Number(query.page) || 1
    // const limit = Number(query.limit) || 10
    // const skip = (page - 1) * limit
    // const fields = query.fields?.split(",").join(" ").split("-").join(" ") || " ";





    // const searchField = {
    //     $or: searchFields.map((field) => ({
    //         [field]: {
    //             $regex: searchTerm,
    //             $options: "i"
    //         },
    //     })),
    // };



    //* Search = fuzzy match(regex)
    //* Filter = exact match

    //* const getAllTours = await Tour.find(queryField).find(filter).sort(sort)?.select(fields).skip(skip).limit(limit)

    //* const searchQuery = QueryBuilder(Tour.find(searchFields))
    //* const filterQuery = searchQuery.find(filter) // in this two step does not require "await" cause query is still buliding up. not reteiving the data. it keeps query at last of chaining . when it reaches the last chain then it has to await untill data retrived from mongodb and send it to the client. if await doesn't use the whole system execute and data not found in client side
    //* const getAllTours = await filterQuery.sort(sort)?.select(fields).skip(skip).limit(limit)
    // const totalTour = await Tour.countDocuments();
    // const totalPage = Math.ceil(totalTour / limit)

    const queryBuilder = new QueryBuilder(Tour.find(), query);

    queryBuilder.search(searchFields)
                .sort()
                .filter()
                .fields()
                .paginate()

    const [data, meta] = await Promise.all([
        queryBuilder.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    };
};

const getSingleTour = async (slug:string) =>{

    const getSingleTour =  await Tour.findOne({slug})

    return getSingleTour
}

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
    getSingleTour
};

//todo================ TOUR TYPE SERVICES ==================

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
