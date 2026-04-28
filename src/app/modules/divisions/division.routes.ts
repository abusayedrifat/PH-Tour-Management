import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";
import { DivisionController } from "./division.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createDivisionZodSchema,
  updateDivisionZodSchema,
} from "./divison.validation";

const router = Router();

router.post(
  "/create-division",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionZodSchema),
  DivisionController.createDivision,
);

router.get(
  "/",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionController.getALlDivision,
);

router.patch(
  "/:id",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateDivisionZodSchema),
  DivisionController.updateDivision,
);

router.delete(
  "/:id",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionController.deleteDivision,
);

export const DivisionRoutes = router;
