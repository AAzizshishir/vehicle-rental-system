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

  return;
};

export const authControllers = {
  signUp,
};
