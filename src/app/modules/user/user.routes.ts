/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "./user.interface";
import { multerUpload } from "../../config/multer.config";

const router = Router();



router.post(
    "/register",
    multerUpload.single("file"),
    validateRequest(createUserZodSchema),
    UserControllers.createUser,
);

router.get(
    "/allUsers",
    checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
    UserControllers.getALlUsers

);
router.get(
    "/getMe",
    checkAuthorization(...Object.values(Role)),
    UserControllers.getMe

);

router.patch("/:id",
    checkAuthorization(...Object.values(Role)),
    multerUpload.single("file"),
    validateRequest(updateUserZodSchema),
    UserControllers.updateUser
)

export const UserRoutes = router;
