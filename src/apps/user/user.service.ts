import { UserModule } from "./user.module";
import { Exception } from "@root/core";

export class UserService {
  private userModule: UserModule;

  constructor() {
    this.userModule = new UserModule();
  }

  async getUserByEmail(email?: string) {
    if(!email) throw new Exception("Can not get user with empty Email id");
    return this.userModule.getUserByEmail(email);
  }
}
