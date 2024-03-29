import { Database } from "@root/db";
import { Binder, Controller, Exception, Validator } from "@root/core";
import { Request } from "express";
import { UserService } from "./user.service";
import { userGetApiValidation } from "./schema";
import { User, UserGetApi } from "./types";

@Binder
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Controller
  @Validator(userGetApiValidation)
  async getUser(req: UserGetApi.Request): Promise<User> {
    const data = await this.userService.getUserByEmail(req.params.emailId);
    return data;
  }

  async createUser() {}
}
