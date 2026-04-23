/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "./user.interface";

const router = Router();



router.post(
    "/register",
    // validateRequest(createUserZodSchema),
    UserControllers.createUser,
);

router.get(
    "/allUsers",
    checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
    UserControllers.getALlUsers

);

router.patch("/:id",
     validateRequest(updateUserZodSchema),
    checkAuthorization(...Object.values(Role)),
    UserControllers.updateUser
)

export const UserRoutes = router;
