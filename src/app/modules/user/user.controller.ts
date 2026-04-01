import { Request, Response } from "express";
import { User } from "./user.model";

import httpStatus from "http-status-codes"

const createUser = async (req:Request, res:Response) =>{

    try {
        const {name, email} = req.body;

        const user = await User.create({
            name,
            email 
        })

        res.status(httpStatus.CREATED)
    } 
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error:any) {
        console.log(error);

        res.status(400).json({
            message:`Something went wrong!! ${error.message}`,
            error
        })
        
    }
}