import { Database } from "@root/db";
import { User } from "./types";
import config from "@root/config";
import { Exception } from "@root/core";
import { HttpStatus } from "@root/constants";
export class UserModule {
  private db: Database;
  constructor() {
    this.db = new Database(config.get("table_mapping")["user_data"]);
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.db.get(email);
    if (!user) throw new Exception("User Not Found", HttpStatus.NOT_FOUND);
    return user as User;
  }
}
