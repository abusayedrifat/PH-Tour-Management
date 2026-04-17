/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

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

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created successfully",
      data: user,
    });
  },
);

const getALlUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    // res.status(httpStatus.ACCEPTED).json({
    //   success: true,
    //   user,
    // });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id as string
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    const varifiedToken = req.user
    const payload = req.body;
    const user = await UserServices.updateUser(userId ,payload, varifiedToken)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user updated successfully",
      data: user
    });
  },)

export const UserControllers = {
  createUser,
  getALlUsers,
  updateUser
};
