import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUp(req.body);
    res.status(201).json({
      succes: true,
      data: result,
      message: "SignUp successful",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const result = await authServices.signIn(email, password, role);
    res.status(200).json({
      success: true,
      message: "login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  signUp,
  signIn,
};
