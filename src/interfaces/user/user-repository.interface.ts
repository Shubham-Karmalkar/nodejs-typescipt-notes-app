import { User } from "@root/types/user.types";

export interface IUserRepo {
    getUser(id: string): Promise<User>;
}
