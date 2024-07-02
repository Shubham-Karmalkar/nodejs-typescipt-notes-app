import { IUserRepository } from "@interfaces/user";

export class UserService {
    constructor(private repo: IUserRepository) {}

    async getUser(id: string) {
        return await this.repo.getUser(id);
    }
}
