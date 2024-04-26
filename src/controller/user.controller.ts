import { bind, Controller, Validator } from "@root/core";
import { UserService } from "@root/service/user.service";
import { userGetApiValidation } from "@root/validations/user.validation";
import { GetGoogleAuthUrl, UserGetApi } from "@root/types/user.types";
import { getGoogleAuthURL } from "@root/lib/auth/google-auth";

@bind
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Controller
    @Validator(userGetApiValidation)
    async getUser(req: UserGetApi.Request): Promise<void> {}

    @Controller
    async getGoogleAuthUrl(req: GetGoogleAuthUrl.Request): Promise<string> {
        return getGoogleAuthURL();
    }

    async createUser() {}
}
