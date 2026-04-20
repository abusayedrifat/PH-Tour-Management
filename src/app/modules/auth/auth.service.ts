/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { envVars } from './../../config/env';
import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import {
    createNewAccessTokenWithRefreshToken,
    createUserTokens,
} from "../../utils/tokens";
import { JwtPayload } from "jsonwebtoken";

const crendentialsLogIn = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    console.log(payload);

    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "email does not exist", "");
    }

    const isPasswordMatched = await bcrypt.compare(
        password as string,
        isUserExists.password as string,
    );

    if (!isPasswordMatched) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Incorrect password or email",
            "",
        );
    }

    // const jwtPayload = {
    //     email: isUserExists.email,
    //     role: isUserExists.role,
    //     id: isUserExists._id
    // }
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRES_IN)

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_IN )

    const userTokens = createUserTokens(isUserExists);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExists.toObject();

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        rest,
    };
};

//*=========== get new access token ========================

const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return newAccessToken
};


//* ==================== reset password ===================

const resetPassword = async(oldPassword:string, newPassword:string, decodedToken: JwtPayload)=>{

    const user = await User.findById(decodedToken.id)

    const isOldPasswordMatch = bcrypt.compare(oldPassword, user?.password as string)

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized','')
    }

    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save()


}

export const AuthServices = {
    crendentialsLogIn,
    getNewAccessToken,
    resetPassword
};
