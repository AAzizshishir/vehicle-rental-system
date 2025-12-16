import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token)
        return res.status(401).json({ message: "You are not allowed" });

      const authToken = req.headers.authorization?.split(" ")[1];

      const decodedToken = jwt.verify(
        authToken as string,
        config.jwtSecret as string
      ) as JwtPayload;

      req.user = decodedToken;

      if (roles.length && !roles.includes(decodedToken.role)) {
        return res.status(401).json({
          error: "unauthorized!!!",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
