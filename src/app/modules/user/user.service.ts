
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

//*======== create user ====================================
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });

    // if (isUserExist) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User already exist", "");
    // }

    const hasedPassword = await bcrypt.hash(
        password as string,
        Number(envVars.BCRYPT_SALT_ROUND),
    );

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string,
    };

    const user = await User.create({
        email,
        password: hasedPassword,
        auths: [authProvider],
        ...rest,
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

//*============== get Me =============================
const getMe = async (id:string) => {
    const user = await User.findById(id);
    console.log("from get me service",user);
    
    return {
        data: user,
       
    };
};

//*==============Update User ===========================

const updateUser = async (
    _id: string,
    payload: Partial<IUser>,
    decodedToken: JwtPayload,
) => {

    console.log(payload.picture);
    
    const isUserExist = await User.findById({_id});
    console.log('fromuser service',_id);
    

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "This user not found", "");
    }

    //* email - can't update email
    // *password - re-hased password
    // *name,address,phone, picture
    // *only admin/ super_admin - role, isDeleted,....
    // *

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized", "");
        }

        if (decodedToken.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized", "");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVarified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized", "");
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(
            payload.password,
            envVars.BCRYPT_SALT_ROUND,
        );
    }

    const newUpdatedUser = await User.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    });

    if (payload.picture && isUserExist.picture) {
        await deleteImageFromCloudinary(isUserExist.picture)
    }

    return newUpdatedUser;
};

export const UserServices = {
    createUser,
    getAllUsers,
    updateUser,
    getMe
};
