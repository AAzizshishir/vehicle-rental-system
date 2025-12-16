import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/v1/vehicles", auth("admin"), vehicleControllers.createVehicle);

export const vehicleRoutes = router;
