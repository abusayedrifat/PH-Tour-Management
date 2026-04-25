import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, req:Request, res:Response, next: NextFunction) =>{

    /**
     * mongoose
     * - duplicate key error
     */

    let statusCode = 500
    let message = `Something went wrong!!`

    if (err.code === 11000) {
        statusCode = 400
        const duplicateKeyValue = err.keyValue[Object.keys(err.keyValue)[0]] //* Object.keys() returns an array of keys
        message= `${duplicateKeyValue}  already exists`
        
    }
    else if(err.name === "CastError"){
        statusCode = 400
        message=`Invalid MongoDB Object Id. Please, provide a valid id`
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
        
    } else if(err instanceof Error){
        statusCode = 500
        message = err.message
    }

    res.status(statusCode).json({
            success:false,
            message,
            err,
            stack: envVars.NODE_ENV === "development" ? err.stack : null
        })
}