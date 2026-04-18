import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router()

router.post('/logIn',
    AuthControllers.credentialsLogIn
)

router.post('/refresh-token',
    AuthControllers.getNewAccessToken
)


export const AuthRoutes = router