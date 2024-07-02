import { IUserRules } from "@interfaces/rules/user-rules.interface";
import { EUserRules } from "../../entity/rules/user-rules.entity";
import { DEFAULT_USER_RULES } from "@constants/rules";

export class BaseRules implements IUserRules {
    private userType: EUserRules["userType"];
    private daily: EUserRules["daily"];
    private monthly: EUserRules["monthly"];

    constructor(usage?: EUserRules) {
        const utilization = usage || DEFAULT_USER_RULES("base");
        this.userType = utilization.userType;
        this.daily = utilization.daily;
        this.monthly = utilization.monthly;
    }

    public exhausted(dbUserRules?: EUserRules): boolean {
        return true;
    }

    public resetDaily(): boolean {
        throw new Error("Method not implemented.");
    }

    public resetMonthly(): boolean {
        throw new Error("Method not implemented.");
    }
}
