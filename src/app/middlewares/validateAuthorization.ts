import jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { Role } from '../modules/user/user.interface';



export const Authorization = async(req:Request, res:Response, next:NextFunction)=>{

    try {
        const accessToken = req.headers.authorization

        if (!accessToken) {
            throw new AppError(403, "token not received",'')
        }

        const varifiedToken = jwt.verify(accessToken, "secret")
        console.log(varifiedToken);
        
        if ((varifiedToken as JwtPayload).role !== Role.ADMIN ) {
            throw new AppError(403, "you are not paermitted to see this route", '')
        }
        
        next()


    } catch (error) {
        next(error)
    }
}