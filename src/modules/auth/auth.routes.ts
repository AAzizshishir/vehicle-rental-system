import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

// signUp
router.post("/api/v1/auth/signup", authControllers.signUp);

// signIn
router.post("/api/v1/auth/signin", authControllers.signIn);

export const authRoutes = router;
