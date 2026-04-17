/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes'
import { envVars } from "../../config/env";


//*======== create user ====================================
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User already exist', '')
    }

    const hasedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }

    const user = await User.create({
        email,
        password: hasedPassword,
        auths: [authProvider],
        ...rest
    });
    return user;
};



//*============== get all users =============================
const getAllUsers = async () => {

    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers,
        },
    };
};

export const UserServices = {
    createUser,
    getAllUsers,
};
