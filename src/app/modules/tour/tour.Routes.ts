import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createZodTour,
  createZodTourType,
  updateZodTour,
  updateZodTourType,
} from "./tour.validaton";
import { TourController } from "./tour.controller";

const router = Router();

//todo================= TOUR  ========================================

router.post(
  "/create-tour",
  validateRequest(createZodTour),
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.createTour,
);

//*=========== getAll tour ============
router.get(
  "/",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.getAllTour,
);

//*=========== update tour ============
router.patch(
  "/:id",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateZodTour),
  TourController.updateTour,
);

//*=========== delete tour ============
router.delete(
  "/:id",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTour,
);

//todo================= TOUR TYPES ====================================

router.post(
  "/create-tour-types",
  validateRequest(createZodTourType),
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.createTourType,
);

//*=========== getAll tour types ============
router.get(
  "/tour-types",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.getAllTourType,
);

//*=========== update tour type ============
router.patch(
  "/tour-type/:id",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateZodTourType),
  TourController.updateTourType,
);

//*=========== delete tour type ============
router.delete(
  "/tour-type/:id",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTourType,
);

export const TourRoutes = router;
