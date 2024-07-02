import { EUser } from "./user";

export interface ESubscription {
    id: string; //primary index
    _userId: string; //secondary index
    subscriptionType: EUser["type"];
    transactionId: string;
    expiresAt: number;
    paidAt: number;
    paidAmount: number;
    currency: string;
    paymentMethod: string;
}
