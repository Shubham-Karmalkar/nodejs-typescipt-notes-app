import { EUserRules } from "@entity/rules/user-rules.entity";
import { EUser } from "@root/entity/user";

export const DEFAULT_USER_RULES: (userType: EUser["type"]) => EUserRules = (userType: EUser["type"]) => ({
    userType,
    daily: {
        createdNotes: 0,
        updatedNotes: 0,
        sharedNotes: 0,
        reminders: 0,
        likedNotes: 0,
        endTime: 0,
    },
    monthly: {
        createdNotes: 0,
        updatedNotes: 0,
        sharedNotes: 0,
        reminders: 0,
        likedNotes: 0,
        endTime: 0,
    },
});
