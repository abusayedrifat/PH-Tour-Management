import  bcrypt  from 'bcryptjs';
import  httpStatus  from 'http-status-codes';
import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const crendentialsLogIn = async (payload: Partial<IUser>)=>{

    const {email, password } = payload

    const isEmailExists = await User.findOne({email})

    if (!isEmailExists) {
        throw new AppError(httpStatus.BAD_REQUEST,"email does not exist","")
    }

    const isPasswordMatched = await bcrypt.compare(password as string , isEmailExists.password as string)

    if (!isPasswordMatched) {
         throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password or email","")
    }

 return{
    email: isEmailExists.email
 }

}


export const AuthServices = {
    crendentialsLogIn
}
