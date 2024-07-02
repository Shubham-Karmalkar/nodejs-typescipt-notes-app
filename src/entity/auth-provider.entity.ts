import { AUTH_PROVIDERS } from "@root/constants/auth";

export type EAuthProvider = EEmailPasswordAuth | EGoogleAuth;

export interface EEmailPasswordAuth {
    id: string; //primary index
    _userId: string; //secondary index
    authType: AUTH_PROVIDERS.EmailPassword;
    email: string;
    createdAt: number;
    updatedAt: number;
    password: string;
}

export interface EGoogleAuth {
    id: string;
    _userId: string;
    authType: AUTH_PROVIDERS.Google;
    email: string;
    createdAt: number;
    updatedAt: number;
}
