import { IUserRepository } from "@interfaces/user";
import { Database } from "@interfaces/db.interface";
import { User } from "@root/types/user.types";
import config from "configs";

export class UserRepository implements IUserRepository {
    private userTable: string = config.get("table_mapping")["user_data"];

    constructor(private db: Database) {}

    async getUser(id: string): Promise<User> {
        const res = await this.db.get(this.userTable, id);
        return res;
    }
}
