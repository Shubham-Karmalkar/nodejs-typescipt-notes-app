import { IUser } from "@interfaces/user";
import { EUser } from "../../entity/user/user.entity";
import { Exception } from "@core";
import { IUserRules } from "@interfaces/rules/user-rules.interface";

export class BaseUser implements IUser {
    public readonly id: string;
    public readonly _providerId: string;
    public readonly _subscriptionId: string | null;
    public type: "base" | "pro" | "premium";
    public name: string;
    public email: string;
    public imageUrl: string;
    public createdAt: number;
    public updatedAt: number;
    public online: boolean;
    public lastLogin: number;
    public phoneNumber: number;
    public age?: number | undefined;
    public bioData?: string | undefined;
    public usage: IUserRules;

    constructor(data: EUser) {
        for (const key of mandatory) {
            if (!data[key]) throw new Exception(`Mandatory field not present ${key}`);
        }
        for (const key in data) {
            // if (key === "usage") (this as any)[key] = new ;
            (this as any)[key] = (data as any)[key];
        }
    }

    get(): Omit<EUser, "_id" | "_providerId" | "_subscriptionId" | "usage"> {
        throw new Error("Method not implemented.");
    }

    json(): EUser {
        throw new Error("Method not implemented.");
    }
}

const mandatory: (keyof EUser)[] = ["email", "name", "type", "imageUrl"];
