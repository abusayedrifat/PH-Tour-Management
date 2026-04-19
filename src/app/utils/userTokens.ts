import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelper/AppError";

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateToken(
        jwtPayload,
        envVars.JWT_ACCESS_SECRET,
        envVars.JWT_EXPIRES_IN,
    );

    const refreshToken = generateToken(
        jwtPayload,
        envVars.JWT_REFRESH_SECRET,
        envVars.JWT_REFRESH_IN,
    );

    return {
        accessToken,
        refreshToken,
    };
};




export const createNewAccessTokenWithRefreshToken = async (
    refreshToken: string,
) => {
    const verifiedRefreshToken = verifyToken(
        refreshToken,
        envVars.JWT_REFRESH_SECRET,
    ) as JwtPayload;

    const { email } = verifiedRefreshToken;
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
        accessToken
    }
};
