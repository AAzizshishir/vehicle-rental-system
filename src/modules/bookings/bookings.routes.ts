import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingsControllers } from "./bookings.controller";

const router = Router();

router.post(
  "/api/v1/bookings",
  auth("admin", "customer"),
  bookingsControllers.bookingVehicle
);

// Get bookings
router.get("/api/v1/bookings", auth("admin"), bookingsControllers.getBookings);

// Update Booking
router.put(
  "/api/v1/bookings/:bookingId",
  auth("admin", "customer"),
  bookingsControllers.updateBookingStatus
);

export const bookingsRoutes = router;
