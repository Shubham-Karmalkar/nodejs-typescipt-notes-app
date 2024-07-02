import { UserController } from "@controller/user.controller";
import { UserRepository } from "@repository/user.repository";
import { FireStoreDb } from "@root/db";
import { Router } from "express";

export const userRoute = Router();

const database = new FireStoreDb();
const userRepo = new UserRepository(database);
const userController = new UserController(userRepo);

userRoute.get("/:emailId", userController.getUser);
userRoute.get("/get/google/authUrl", userController.getGoogleAuthUrl);
userRoute.post("/register", userController.createUser);
