import { Database } from "@root/db";
import { User } from "./types";
import config from "@root/config";
export class UserModule {
  private db: Database;
  constructor() {
    this.db = new Database(config.get("table_mapping")["user_data"]);
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.db.get(email);
    console.log("user: ", user);
    return user as User;
  }
}
