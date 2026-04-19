import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { Role } from '../user/user.interface';
import { checkAuthorization } from "../../middlewares/checkAuthorization";

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


export const AuthRoutes = router