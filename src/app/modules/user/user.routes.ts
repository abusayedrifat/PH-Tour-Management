import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "./user.interface";

const router = Router();



router.post(
    "/register",
    validateRequest(createUserZodSchema),
    UserControllers.createUser,
);

router.get(
    "/allUsers",
    checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
    UserControllers.getALlUsers

);

export const UserRoutes = router;
