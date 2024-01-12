import express, { Request, Response } from "express";
import { HttpStatus } from "../../constants";
import { Exception, asyncHandler, ApiResponse } from "../../core";
import userController from "./user.controller";
const router = express.Router();

router.get("/", asyncHandler(userController.getUser));
router.post("/create", asyncHandler(userController.createUser));

export default router;
