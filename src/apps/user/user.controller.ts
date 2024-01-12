import { Database } from "@root/db";
import { Exception } from "../../core";
import { User } from "./user.module";
import crypto from 'node:crypto';
import { Request } from "express";

class UserController {
  db: Database;
  constructor() {
    this.db = new Database("users");
  }
  getUser = async (req: Request): Promise<any> => {
    const data = await this.db.get(req.body.email);
    return data;
  }

  createUser = async () => {
    
  }
}
const userController = new UserController();

export default userController;
