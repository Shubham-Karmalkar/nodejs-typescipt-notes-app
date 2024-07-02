import { User } from "@root/types/user.types";

export interface IUserRepository {
    getUser(id: string): Promise<User>;
}
