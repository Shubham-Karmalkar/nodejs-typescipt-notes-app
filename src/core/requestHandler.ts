import { Request, Response } from "express";
import { AsyncFunc } from "../types";
import { ApiResponse } from "./apiResponse";

export function asyncHandler<ReturnType = any>(func: AsyncFunc<ReturnType>) {
  return async function (req: Request, res: Response, ...args: any[]) {
    let next;
    try {
      next = args[args.length - 1];
      const resObj = await func(req, res, ...args);
      return res.json(new ApiResponse(resObj));
    } catch (e) {
      next(e);
    }
  };
}
