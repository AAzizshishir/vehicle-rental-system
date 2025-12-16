import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/v1/auth/signup", authControllers.signUp);

export const authRoutes = router;
