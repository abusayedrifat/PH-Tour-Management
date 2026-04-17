import  { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { verifyToken } from '../utils/jwt';
import { envVars } from '../config/env';



export const checkAuthorization = (...authRoles: string[]) => async(req:Request, res:Response, next:NextFunction)=>{

    try {
        const accessToken = req.headers.authorization

        if (!accessToken) {
            throw new AppError(403, "token not received",'')
        }

        const varifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        console.log(varifiedToken);
        
        if (!authRoles.includes(varifiedToken.role)) {
            throw new AppError(403, "you are not paermitted to see this route", '')
        }
        
        next()


    } catch (error) {
        next(error)
    }
}