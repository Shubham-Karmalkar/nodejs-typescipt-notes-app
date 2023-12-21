import express, { Request, Response } from "express";
import { HttpStatus } from "../../constants";
import { Exception, asyncHandler, ApiResponse } from "../../core";
export const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: any) => {
    //   throw new Exception("throwing error from user route", HttpStatus.NOT_FOUND);
    // res.send("<h1>Hello you have logged in </h1>")
    // throw new Exception("Manually throwing new Error");
    // console.log('req: ', req);
    // console.log('res: ', res);
    // console.log('next: ', next);
    throw new Exception("manully thrown error now");
    // return new ApiResponse("<h1>Hello you have logged in </h1>");
  }),
);
