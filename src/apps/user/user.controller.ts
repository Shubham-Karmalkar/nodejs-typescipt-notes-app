import { Exception } from "../../core";
import { User } from "./user.module";

class UserController {
  async getUser(): Promise<string> {
    throw new Exception("something manual exception thrown")
    return "<h1>Hello you have logged in </h1>";
  }

  async createUser() {
    
  }
}

export default new UserController();
