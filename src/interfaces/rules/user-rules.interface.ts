import { EUserRules } from "@entity/rules/user-rules.entity";

export interface IUserRules {
    exhausted(dbUserRules?: EUserRules): boolean;
    resetDaily(): boolean;
    resetMonthly(): boolean;
}
