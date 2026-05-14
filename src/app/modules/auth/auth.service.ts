/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { envVars } from "./../../config/env";
import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken } from "../../utils/tokens";
import { JwtPayload } from "jsonwebtoken";
import { IAuthProvider, IsActive } from "../user/user.interface";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../utils/sendEmail";


//* we managed this credentialsLogIn through passport js in AuthController
// const crendentialsLogIn = async (payload: Partial<IUser>) => {
//     const { email, password } = payload;
//     console.log(payload);

//     const isUserExists = await User.findOne({ email });

//     if (!isUserExists) {
//         throw new AppError(httpStatus.BAD_REQUEST, "email does not exist", "");
//     }

//     const isPasswordMatched = await bcrypt.compare(
//         password as string,
//         isUserExists.password as string,
//     );

//     if (!isPasswordMatched) {
//         throw new AppError(
//             httpStatus.BAD_REQUEST,
//             "Incorrect password or email",
//             "",
//         );
//     }

//     // const jwtPayload = {
//     //     email: isUserExists.email,
//     //     role: isUserExists.role,
//     //     id: isUserExists._id
//     // }
//     // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRES_IN)

//     // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_IN )

//     const userTokens = createUserTokens(isUserExists);

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password: pass, ...rest } = isUserExists.toObject();

//     return {
//         accessToken: userTokens.accessToken,
//         refreshToken: userTokens.refreshToken,
//         rest,
//     };
// };

//*=========== get new access token ========================

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken =
    await createNewAccessTokenWithRefreshToken(refreshToken);

  return newAccessToken;
};

//* ==================== change password ===================

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload,
) => {
  const user = await User.findById(decodedToken.id);

  const isOldPasswordMatch = bcrypt.compare(
    oldPassword,
    user?.password as string,
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized", "");
  }

  user!.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  user!.save();
};

//* ==================== set password for google authenticated user ===================

const setPassword = async (userId: string, plainPassword: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized", "");
  }

  if (
    user.password &&
    user.auths.some((providerObject) => providerObject.provider === "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already set your password. u cannot set password AggregationCursor. rather u can change or reset ur password",
      "",
    );
  }

  const hasedPassword = await bcrypt.hash(
    plainPassword,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const credentialProvider: IAuthProvider = {
    provider: "credentials",
    providerId: user.email,
  };

  const auth: IAuthProvider[] = [...user.auths, credentialProvider];

  user.password = hasedPassword;
  user.auths = auth;

  await user.save();
};


//* ==================== forgot password ===================
const forgotPassword = async (email: string) => {
  const isUserExists = await User.findOne({ email });


  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not found by this email", "");
  }

  if (!isUserExists.isVarified) {
    throw new AppError(httpStatus.BAD_REQUEST, "email is not verified", "");
  }

  if (
    (isUserExists.isActive === IsActive.BLOCKED ||
      isUserExists.isActive === IsActive.INACTIVE)
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "user is BLOCKED or INACTIVE", "");
  }

  if (isUserExists.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "seems user has been deleted", "");
  }

  const payload = {
    id: isUserExists?._id,
    email: isUserExists?.email,
    role: isUserExists?.role
  }

  const resetToken = jwt.sign(payload, envVars.JWT_ACCESS_SECRET, { expiresIn: '10m' })

  const resetUILink = `${envVars.FRONTEND_URL}/resetPassword?id=${payload.id}&resetToken=${resetToken}`

  sendEmail({
    to: isUserExists.email,
    subject: "Reset password",
    templateName: "forgetPassword",
    templateData: {
      name: isUserExists.name,
      resetUILink
    }
  })



};


//* ==================== reset password ===================

const resetPassword = async (
  payload: Record<string, any>,
  decodedToken: JwtPayload,
) => {

  if (payload.id != decodedToken.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are nor authorized', '')
  }

  const isUserExists = await User.findById(decodedToken.id)

  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user not found', '')
  }

  const hasedPassword = await bcrypt.hash(payload.newPassword, Number(envVars.BCRYPT_SALT_ROUND))

  isUserExists.password = hasedPassword

  await isUserExists.save()

};


export const AuthServices = {
  getNewAccessToken,
  resetPassword,
  changePassword,
  setPassword,
  forgotPassword,
};
