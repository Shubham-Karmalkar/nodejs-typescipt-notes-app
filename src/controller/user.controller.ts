import { bind, Controller, Validator } from "@core";
import { UserService } from "@service/user.service";
import { userGetApiValidation } from "@validations/user.validation";
import { GetGoogleAuthUrl, User, UserGetApi } from "@root/types/user.types";
import { getGoogleAuthURL } from "@root/lib/auth/google-auth";
import { IUserRepository } from "@root/interfaces/user";

@bind
export class UserController {
    private service: UserService;

    constructor(repo: IUserRepository) {
        this.service = new UserService(repo);
    }

    @Controller
    @Validator(userGetApiValidation)
    async getUser(req: UserGetApi.Request): Promise<User> {
        return await this.service.getUser(req.params.emailId);
    }

    @Controller
    async getGoogleAuthUrl(req: GetGoogleAuthUrl.Request): Promise<string> {
        return getGoogleAuthURL();
    }

    async createUser() {}
}
