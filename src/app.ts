import express from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { userRoutes } from "./modules/users/user.routes";

const app = express();
app.use(express.json());

// Initialized Database
initDB();

app.get("/", (req, res) => {
  res.send("Vehicle Rental System!");
});

// Auth Api
app.use("/", authRoutes);

// Vehicle Api
app.use("/", vehicleRoutes);

// User Api
app.use("/", userRoutes);

export default app;
