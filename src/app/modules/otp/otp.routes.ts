/* eslint-disable @typescript-eslint/no-unused-expressions */

import   express from "express";
import { otpContollers } from "./otp.controller";

const router = express.Router()

router.post('/send', otpContollers.sendOTP),
router.post('/verify', otpContollers.verifyOTP)




export const OTProutes = router