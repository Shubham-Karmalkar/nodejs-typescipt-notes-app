import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

const userController = new UserController();

router.get("/:emailId", userController.getUser);
router.post("/register", userController.createUser);

export default router;
