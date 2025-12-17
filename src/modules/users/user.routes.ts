import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/api/v1/users", auth("admin"), userControllers.getUsers);

router.put("/api/v1/users/:userId", auth("admin"), userControllers.updateUser);

router.delete(
  "/api/v1/users/:userId",
  auth("admin"),
  userControllers.deleteUser
);

export const userRoutes = router;
