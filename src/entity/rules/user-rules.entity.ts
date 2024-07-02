import { EUser } from "../user";

export interface EUserRules {
    userType: EUser["type"]; //indexed field
    daily:
        | {
              createdNotes: number;
              updatedNotes: number;
              sharedNotes: number;
              reminders: number;
              likedNotes: number;
              endTime: number;
          }
        | "infinite";
    monthly:
        | {
              createdNotes: number;
              updatedNotes: number;
              sharedNotes: number;
              reminders: number;
              likedNotes: number;
              endTime: number;
          }
        | "infinite";
}
