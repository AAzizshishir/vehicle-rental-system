import { pool } from "../../config/db";

interface bookingsData {
  customer_id: string;
  vehicle_id: string;
  rent_start_date: number;
  rent_end_date: number;
  status: string;
}

// create booking
const createBooking = async (payload: bookingsData) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } =
    payload;

  // Fetch vehicle info
  const vehicleRes = await pool.query(
    `SELECT daily_rent_price, availability_status FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleRes.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const { availability_status, daily_rent_price } = vehicleRes.rows[0];
  if (availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  const bookingStatus = status ?? "active";

  const dailyRentPrice = Number(daily_rent_price);

  // Compute number of rental days (round up any partial day)
  const msPerDay = 1000 * 60 * 60 * 24;
  const start = new Date(rent_start_date).getTime();
  const end = new Date(rent_end_date).getTime();

  if (end <= start) {
    throw new Error("rent_end_date must be after rent_start_date");
  }

  const numberOfDays = Math.ceil((end - start) / msPerDay);
  const totalPrice = Number(numberOfDays * dailyRentPrice);

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      bookingStatus,
    ]
  );

  // Mark vehicle as booked
  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1 RETURNING *`,
    [vehicle_id]
  );

  // Capture inserted booking id
  const bookingId = result.rows[0].id;

  // Select booking data
  const bookingRes = await pool.query(
    `
    SELECT
      b.id,
      b.customer_id,
      b.vehicle_id,
      DATE(b.rent_start_date) AS rent_start_date,
      DATE(b.rent_end_date) AS rent_end_date,
      b.total_price,
      b.status,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'daily_rent_price', v.daily_rent_price
      ) AS vehicle
    FROM bookings b
    JOIN vehicles v ON v.id = b.vehicle_id
    WHERE b.id = $1
  `,
    [bookingId]
  );

  return bookingRes.rows[0];
};

// get all bookings
const getAllBookingsForAdmin = async () => {
  const result = await pool.query(
    `
  SELECT
    b.id,
    b.customer_id,
    b.vehicle_id,
    DATE(b.rent_start_date) AS rent_start_date,
    DATE(b.rent_end_date) AS rent_end_date,
    b.total_price,
    b.status,

    json_build_object(
      'name', c.name,
      'email', c.email
    ) AS customer,

    json_build_object(
      'vehicle_name', v.vehicle_name,
      'registration_number', v.registration_number
    ) AS vehicle

  FROM bookings b
  JOIN users c ON c.id = b.customer_id
  JOIN vehicles v ON v.id = b.vehicle_id
  `
  );

  return result;
};

const cancelBooking = async (bookingId: string, customerId: string) => {
  const bookingRes = await pool.query(
    `
      SELECT *
      FROM bookings
      WHERE id = $1 AND customer_id = $2 AND status = 'active'
      `,
    [bookingId, customerId]
  );

  if (bookingRes.rowCount === 0) {
    throw new Error("Booking not found or not cancellable");
  }

  bookingRes.rows[0];

  // Cancel booking
  const updatedBooking = await pool.query(
    `
      UPDATE bookings
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *
      `,
    [bookingId]
  );

  return updatedBooking.rows[0];
};

// admin return
const markAsReturned = async (bookingId: string) => {
  const bookingRes = await pool.query(
    `
      SELECT *
      FROM bookings
      WHERE id = $1 AND status = 'active'
      `,
    [bookingId]
  );

  if (bookingRes.rowCount === 0) {
    throw new Error("Booking not found or already processed");
  }

  const booking = bookingRes.rows[0];

  // Update booking
  const updatedBooking = await pool.query(
    `
      UPDATE bookings
      SET status = 'returned'
      WHERE id = $1
      RETURNING *
      `,
    [bookingId]
  );

  // Update vehicle
  const vehicleRes = await pool.query(
    `
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = $1
      RETURNING availability_status
      `,
    [booking.vehicle_id]
  );

  return {
    ...updatedBooking.rows[0],
    vehicle: vehicleRes.rows[0],
  };
};

export const bookingsServices = {
  createBooking,
  getAllBookingsForAdmin,
  cancelBooking,
  markAsReturned,
};
