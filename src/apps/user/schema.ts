import { Request } from "express";
import Joi from "joi";
import { UserGetApi } from "./types";

const userGetApi = Joi.object<UserGetApi.Params>({
  userId: Joi.string().email().required(),
});

export function userGetApiValidation(req: Request) {
  return userGetApi.validate(req.params);
}
