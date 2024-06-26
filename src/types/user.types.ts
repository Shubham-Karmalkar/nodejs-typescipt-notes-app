import { AUTH_PROVIDERS } from "@constants/auth";
import { ReqData } from ".";

export interface IUser {
    _id: string;
    type: string;
    name: string;
    email: string;
    imageUrl: string;
    createAt: number;
    updatedAt: number;
    providerId: AUTH_PROVIDERS;
    phoneNumber: number;
}

export type BaseUser = IUser & {
    type: "base";
};

export type ProUser = IUser & {
    type: "pro";
};

export type AdminUser = IUser & {
    type: "admin";
};

export type User = BaseUser | ProUser | AdminUser;

export namespace UserGetApi {
    export type Params = {
        emailId: string;
    };
    export type Request = ReqData<never, Params>;
}

export namespace GetGoogleAuthUrl {
    export type Request = ReqData<never>;
}
