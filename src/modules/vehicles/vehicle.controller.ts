import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

// Created vehicles
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      succes: true,
      data: result.rows[0],
      message: "Vehicle Created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all vehicles
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicles retrieved successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Vehicle by ID
const getSingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  try {
    const result = await vehicleServices.getSingleVehicle(vehicleId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: "Vehicle retrieved successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Vehicle
const updateVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  const payload = req.body;

  try {
    const result = await vehicleServices.updateVehicle(
      payload,
      vehicleId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: "Vehicle updated successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehicleServices.deleteVehicle(vehicleId as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: "Vehicle deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleControllers = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
