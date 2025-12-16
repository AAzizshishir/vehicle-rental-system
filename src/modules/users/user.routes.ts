import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/api/v1/users", auth("admin"), userControllers.getUsers);

export const userRoutes = router;
