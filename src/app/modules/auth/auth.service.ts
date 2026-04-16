import  bcrypt  from 'bcryptjs';
import  httpStatus  from 'http-status-codes';
import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import  Jwt  from 'jsonwebtoken';

const crendentialsLogIn = async (payload: Partial<IUser>)=>{

    const {email, password } = payload

    const isUserExists = await User.findOne({email})

    if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST,"email does not exist","")
    }

    const isPasswordMatched = await bcrypt.compare(password as string , isUserExists.password as string)

    if (!isPasswordMatched) {
         throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password or email","")
    }

    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role,
        id: isUserExists._id
    }
    const accessToken = Jwt.sign(jwtPayload, 'secret', {expiresIn:'1d'})

 return{
    accessToken
 }

}


export const AuthServices = {
    crendentialsLogIn
}
