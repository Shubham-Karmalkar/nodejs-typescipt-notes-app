import { Request } from "express";
import { UserGetApi } from "@root/types/user.types";
import Joi from "joi";

const userGetApi = Joi.object<UserGetApi.Params>({
    emailId: Joi.string().email().required(),
});

export function userGetApiValidation(req: Request) {
    return userGetApi.validate(req.params);
}
