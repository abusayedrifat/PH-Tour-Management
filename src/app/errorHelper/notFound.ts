import  httpStatus  from 'http-status-codes';
import { Request, Response } from "express";


const routeNotFound = (req:Request, res:Response)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:"Route Not Found"
    })
}

export default routeNotFound