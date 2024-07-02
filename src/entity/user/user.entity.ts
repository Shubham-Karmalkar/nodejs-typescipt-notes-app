import { EUserRules } from "../rules/user-rules.entity";

export interface EUser {
    id: string; //default id for entry
    _providerId: string; //id for login type data
    _subscriptionId: string | null; //current subscription plan Id
    subscriptionExp: number | null;
    type: "base" | "premium" | "pro";
    name: string;
    email: string; //indexed field
    imageUrl: string;
    createdAt: number;
    updatedAt: number;
    online: boolean;
    lastLogin: number;
    phoneNumber: number;
    age?: number;
    bioData?: string;
    usage: EUserRules;
}
