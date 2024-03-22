import { NextFunction, Request, Response } from "express";
import { VoidFunc, AsyncFunc, Func } from "../types";
import { ApiResponse } from "./apiResponse";
import Joi from "joi";
import { Exception } from "./errors";
import { HttpStatus } from "@root/constants";

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

//decorator
export function Controller(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalController = descriptor.value;
  //replace original controller with below controller
  descriptor.value = async function (...args: [Request, Response, NextFunction]) {
    const nextFunc: NextFunction = args[2];
    const res: Response = args[1];
    try {
      const resObj = await originalController.apply(this, args);
      //providing flexibility so dev can send custome status code with response
      const finalRes: ApiResponse = resObj instanceof ApiResponse ? resObj : new ApiResponse(resObj);

      return res.status(finalRes.statusCode).json(finalRes);
    } catch (error) {
      nextFunc(error);
    }
  };
}

export function Validator(validator: Joi.ObjectSchema | ValidatorFunc) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalController = descriptor.value;

    descriptor.value = async function (...args: [Request, Response, NextFunction]) {
      const req = args[0];
      let validationRes;
      if (typeof validator === "function") {
        validationRes = validator(req); //can have function with multiple validations
      } else {
        validationRes = validator.validate(req.body);
      }
      if (validationRes.error) throw new Exception(validationRes.error.message, HttpStatus.BAD_REQUEST);
      return await originalController.apply(this, args);
    };
  };
}

export type ValidatorFunc = Func<Request, { error?: { message: string } }>;
