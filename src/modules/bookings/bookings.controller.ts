import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

// Bookings Created
const bookingVehicle = async (req: Request, res: Response) => {
  try {
    const booking = await bookingsServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const data = await bookingsServices.getAllBookingsForAdmin();

    if (data.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }

    res.status(200).json({
      success: true,
      message: "bookings fethced successfully",
      data: data.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update booking
// const updateBooking = async (req: Request, res: Response) => {
//   const { bookingId } = req.params;

//   try {
//     const result = await bookingsServices.updateBooking(bookingId as string);
//     res.status(200).json({
//       success: true,
//       message: "Booking cancelled successfully",
//       result: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

const updateBookingStatus = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const { id: userId, role } = req.user!;

  try {
    // Role-based validation
    if (role === "customer" && status !== "cancelled") {
      return res.status(403).json({
        success: false,
        message: "Customers can only cancel bookings",
      });
    }

    if (role === "admin" && status !== "returned") {
      return res.status(403).json({
        success: false,
        message: "Admins can only mark bookings as returned",
      });
    }

    const result =
      role === "admin"
        ? await bookingsServices.markAsReturned(bookingId as string)
        : await bookingsServices.cancelBooking(bookingId as string, userId);

    res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingsControllers = {
  bookingVehicle,
  getBookings,
  updateBookingStatus,
};
