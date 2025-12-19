import { pool } from "../../config/db";

// Created Vehicles
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

// Get all vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result;
};

// Get Vehicle by ID
const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

  return result;
};

// updateVehicle

interface VehicleData {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string;
}

const updateVehicle = async (payload: VehicleData, id: string) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result;
};

// Delete Vehicle
const deleteVehicle = async (id: string) => {
  const activeBookingRes = await pool.query(
    `
      SELECT 1
      FROM bookings
      WHERE vehicle_id = $1
        AND status = 'active'
      LIMIT 1
      `,
    [id]
  );

  if (activeBookingRes.rowCount === 1) {
    throw new Error("Vehicle cannot be deleted because it has active bookings");
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

  return result;
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
