import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IsActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createUserTokens } from "../../utils/userTokens";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const crendentialsLogIn = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    console.log(payload);
    
    const isUserExists = await User.findOne({email});

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
    const verifiedRefreshToken = verifyToken(
        refreshToken,
        envVars.JWT_REFRESH_SECRET,
    ) as JwtPayload;


    const {email} = verifiedRefreshToken
    const isUserExists = await User.findOne({email});

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

    /**
        * Even though the user already has a valid refresh token, we still query the database again for security and validation.
   
   //?Why check the database again?
   
   Because a JWT refresh token only proves:
   
   “This token was created for this user at some point in the past.
   It does NOT guarantee that the user is still valid right now.
   Things may have changed after login.”
   
   //*Example situations
   Suppose the user logged in yesterday and got a refresh token.
   
     Today:
   //* admin deleted the account
   //* admin blocked the user
   //* user became inactive
   //* user role changed
   //* account was suspended
   
   "The old refresh token still exists and may still be valid by expiry time.
   If we don’t check the database again, that user could still get a new access token."
   
   //?That would be a security problem.
        */



    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role,
        id: isUserExists._id,
    };

    const accessToken = generateToken(
        jwtPayload,
        envVars.JWT_ACCESS_SECRET,
        envVars.JWT_EXPIRES_IN,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExists.toObject();

    return {
        accessToken,
    };
};

export const AuthServices = {
    crendentialsLogIn,
    getNewAccessToken,
};
