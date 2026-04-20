import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { Role } from '../user/user.interface';
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import passport from "passport";

const router = Router()

router.post('/logIn',
    AuthControllers.credentialsLogIn
)

router.post('/refresh-token',
    AuthControllers.getNewAccessToken
)
router.post('/logout',
    AuthControllers.logout
)
router.post('/resetPassword',checkAuthorization(...Object.values(Role)),
    AuthControllers.resetPassword
)

router.get('/google', async(req:Request, res:Response, next:NextFunction)=>{
    passport.authenticate("google", {scope: ["profile","email"]})(req, res, next)
} )

router.get('/google/callback', passport.authenticate("google", {failureRedirect:"/logIn"}) ,AuthControllers.googleCallBackController )


export const AuthRoutes = router