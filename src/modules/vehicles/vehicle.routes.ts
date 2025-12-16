import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

// Created Vehicle
router.post(
  "/api/v1/vehicles",
  auth("admin"),
  vehicleControllers.createVehicle
);

// Get all vehicles
router.get("/api/v1/vehicles", vehicleControllers.getAllVehicles);

// Get Vehicle by ID
router.get("/api/v1/vehicles/:vehicleId", vehicleControllers.getSingleVehicle);

// Update Vehicle
router.put(
  "/api/v1/vehicles/:vehicleId",
  auth("admin"),
  vehicleControllers.updateVehicle
);

// Delete Vehicle
router.delete(
  "/api/v1/vehicles/:vehicleId",
  auth("admin"),
  vehicleControllers.deleteVehicle
);

export const vehicleRoutes = router;
