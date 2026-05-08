import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBookingZodSchema } from "./booking.validation";

const router = Router();

router.post(
  "/",
  checkAuthorization(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking,
);

router.get(
  "/",
  checkAuthorization(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.getAllBooking,
);

router.get(
  "/my-bookings",
  checkAuthorization(...Object.values(Role)),
  BookingController.getUserBooking,
);

router.get(
  "/:bookingId",
  checkAuthorization(...Object.values(Role)),
  BookingController.getSingleBooking,
);


// router.patch(
//   "/:bookingId/status",
//   checkAuthorization(...Object.values(Role)),
//   BookingController.,
// );


// router.delete("/:id");

export const BookingRoutes = router;
