import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router()

router.post('/logIn',
    AuthControllers.credentialsLogIn
)


export const AuthRoutes = router