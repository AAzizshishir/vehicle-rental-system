import { Request, Response } from "express";
import { userService } from "./user.service";

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  getUsers,
};
