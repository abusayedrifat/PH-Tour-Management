/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";


// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await UserServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (err: any) {

//     console.log(err);
//     next(err);
//   }
// };

const createUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user,
    });
  },
);


const getALlUsers = catchAsync( async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserServices.getAllUsers();

    res.status(httpStatus.ACCEPTED).json({
      success: true,
      user,
    });
  },
);

export const UserControllers = {
  createUser,
  getALlUsers,
};
