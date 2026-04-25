import  httpStatus  from 'http-status-codes';
import  { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { verifyToken } from '../utils/jwt';
import { envVars } from '../config/env';
import { User } from '../modules/user/user.model';
import { IsActive } from '../modules/user/user.interface';



export const checkAuthorization = (...authRoles: string[]) => async(req:Request, res:Response, next:NextFunction)=>{

    try {
        const accessToken = req.headers.authorization

        if (!accessToken) {
            throw new AppError(403, "token not received",'')
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        console.log(verifiedToken);

        
            const { email } = verifiedToken;
            const isUserExists = await User.findOne({ email });
        
            if (!isUserExists) {
                throw new AppError(httpStatus.BAD_REQUEST, "user does not exist", "");
            }
        
            if (
                isUserExists.isActive === IsActive.BLOCKED ||
                isUserExists.isActive === IsActive.INACTIVE
            ) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    `user is ${isUserExists.isActive}`,
                    "",
                );
            }
        
            if (isUserExists.isDeleted) {
                throw new AppError(httpStatus.BAD_REQUEST, "user is deleted", "");
            }
        
        
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "you are not paermitted to see this route", '')
        }

        req.user = verifiedToken
        
        next()


    } catch (error) {
        next(error)
    }
}