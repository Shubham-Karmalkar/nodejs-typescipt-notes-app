import { Database } from "@root/db";
import { Exception } from "../../core";
import { Request } from "express";
import { UserService } from "./user.service";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  getUser = async (req: Request): Promise<any> => {
    const data = await this.userService.getUserByEmail(req.body.email);
    return data;
  };

  createUser = async () => {};
}
const userController = new UserController();

export default userController;
