import { Request, Response } from "express";
import { VoidFunc, AsyncFunc } from "../types";
import { ApiResponse } from "./apiResponse";

export function asyncHandler(func: AsyncFunc<ApiResponse>) {
  return async function (req: Request, res: Response, ...args: any[]) {
    let next;
    try {
      next = args[args.length - 1];
      const resObj = await func(req, res, ...args);
      return res.json(resObj);
    } catch (e) {
      next(e);
      // throw e;
    }
  };
}
