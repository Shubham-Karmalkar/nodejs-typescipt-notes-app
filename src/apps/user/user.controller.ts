import { Database } from "@root/db";
import { Binder, Controller, Exception } from "@root/core";
import { Request } from "express";
import { UserService } from "./user.service";

@Binder
class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Controller
  async getUser(req: Request): Promise<any> {
    const data = await this.userService.getUserByEmail(req.body.email);
    return data;
  }

  async createUser() {}
}

const userController = new UserController();

export default userController;
