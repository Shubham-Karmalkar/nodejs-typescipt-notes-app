import { EUser } from "@entity/user";
import { IUserRules } from "../rules/user-rules.interface";

export interface IUser {
    //methods
    get(): Omit<EUser, "_id" | "_providerId" | "_subscriptionId" | "usage">;
    json(): EUser;
}
