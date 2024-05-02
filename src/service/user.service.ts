import { IUserRepo } from "@root/interfaces/user";

export class UserService {
    constructor(private repo: IUserRepo) {}

    async getUser(id: string) {
        return await this.repo.getUser(id);
    }
}
