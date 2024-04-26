import Joi from "joi";
import { Exception, stackFilter } from "./errors";
import { HttpStatus } from "@constants";
import { NextFunction, Request, Response } from "express";
import { Func } from "../types";
import { ApiResponse } from "./apiResponse";

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
        } catch (error: any) {
            stackFilter(error, "Controller.descriptor.value");
            nextFunc(error);
        }
    };
}

export function Get(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
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

export function Post(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
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

export type ValidatorFunc = Func<Request, { error?: { message: string } }>;

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

export function bind<Type extends { new (...args: any[]): any }>(target: Type) {
    return class extends target {
        constructor(...args: any[]) {
            super(...args);
            const methods = Object.getOwnPropertyNames(target.prototype);

            for (const methodName of methods) {
                if (methodName !== "constructor" && typeof this[methodName] === "function") {
                    this[methodName] = this[methodName].bind(this);
                }
            }
        }
    };
}
