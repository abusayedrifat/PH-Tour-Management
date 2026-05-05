import { Router } from "express";
import { checkAuthorization } from "../../middlewares/checkAuthorization";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
  "/",
  checkAuthorization(...Object.values(Role)),
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


router.patch(
  "/:bookingId/status",
  checkAuthorization(...Object.values(Role)),
  BookingController.updateBooking,
);


// router.delete("/:id");

export const BookingRoutes = router;
