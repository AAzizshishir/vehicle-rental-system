import express from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";

const app = express();
app.use(express.json());

// Initialized Database
initDB();

app.get("/", (req, res) => {
  res.send("Vehicle Rental System!");
});

// Auth Api
app.use("/api", authRoutes);

// Vehicle Api
app.use("/api", vehicleRoutes);

// User Api
// app.use("/users", userRoutes);

export default app;
