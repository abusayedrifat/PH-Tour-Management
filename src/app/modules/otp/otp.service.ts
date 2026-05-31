import  httpStatus  from 'http-status-codes';
import { redisClient } from "../../config/redis.config"
import AppError from "../../errorHelper/AppError"
import { sendEmail } from "../../utils/sendEmail"
import { User } from '../user/user.model';

const OTP_EXPIRATION = 2*60

const generateOTP = (length: number) => {
    const otp = Math.ceil(Math.random() * (10 ** length))
        .toString()
        .padStart(6,'0')

    return otp
}


const sendOTP = async (name:string, email:string) => {

    
    const user = await User.findOne({email})

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND,"user not found",'')
    }

    if (user.isVarified) {
         throw new AppError(httpStatus.NOT_FOUND, 'user already verified','' )

    }

    const otp = generateOTP(6)
    const redisKey = `otp:${email}`

    await redisClient.set(redisKey, otp ,{
        expiration:{
            type:"EX",
            value:OTP_EXPIRATION
        }
    })

    await sendEmail({
        to:email,
        subject:"your OTP code",
        templateName:"otp",
        templateData:{
           name:name, 
           otp:otp
        }
    })
}

const verifyOTP = async(email:string, otp:string)=>{

    const user = await User.findOne({email})

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND,"user not found",'')
    }

    if (user.isVarified) {
         throw new AppError(httpStatus.NOT_FOUND, 'user already verified','' )

    }

    const redisKey = `otp:${email}`
    const savedOTP = await redisClient.get(redisKey)

    if (!savedOTP) {
        throw new AppError(httpStatus.NOT_FOUND, 'otp not found','' )

    }

    if (savedOTP !== otp) {
         throw new AppError(httpStatus.NOT_FOUND, 'otp u provided not matched','' )
    }

    Promise.all([
        await User.updateOne(
            {email},
            {isVarified:true},
            {runValidators:true}
        ),
        await redisClient.del([redisKey])
    ])
}

export const OTPservices = {
    sendOTP,
    verifyOTP
}