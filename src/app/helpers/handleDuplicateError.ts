/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/error.types";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const matchedDuplicateKey = err.keyValue[Object.keys(err.keyValue)[0]];
    return {
        statusCode: 400,
        message: `${matchedDuplicateKey} already exists`,
    };
};