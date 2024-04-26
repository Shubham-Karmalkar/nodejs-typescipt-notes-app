import { UserController } from "@controller/user.controller";
import { Router } from "express";

export const userRoute = Router();

const userController = new UserController();

userRoute.get("/:emailId", userController.getUser);
userRoute.get("/get/google/authUrl", userController.getGoogleAuthUrl);
userRoute.post("/register", userController.createUser);
