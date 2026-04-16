import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Router } from "express";
import { Authorization } from "../../middlewares/validateAuthorization";

const router = Router();

router.post(
    "/register",
    validateRequest(createUserZodSchema),
    UserControllers.createUser,
);

router.get(
    "/allUsers",
    Authorization,
    UserControllers.getALlUsers

);

export const UserRoutes = router;
