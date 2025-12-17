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

// Update Users
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const payload = req.body;
  try {
    const result = await userService.updateUser(payload, userId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
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

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await userService.deleteUser(userId as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user deleted successful",
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
  updateUser,
  deleteUser,
};
