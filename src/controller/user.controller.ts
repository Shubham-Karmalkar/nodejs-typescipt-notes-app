import { bind, Controller, Exception, Validator } from "@core";
import { UserService } from "@service/user.service";
import { userGetApiValidation } from "@validations/user.validation";
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
    async getUser(req: UserGetApi.Request): Promise<void> {
        throw new Error("throwin manual error");
    }

    @Controller
    async getGoogleAuthUrl(req: GetGoogleAuthUrl.Request): Promise<string> {
        return getGoogleAuthURL();
    }

    async createUser() {}
}
