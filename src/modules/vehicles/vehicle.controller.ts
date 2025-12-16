import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      succes: true,
      data: result.rows[0],
      message: "Vehicle Created successful",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleControllers = {
  createVehicle,
};
