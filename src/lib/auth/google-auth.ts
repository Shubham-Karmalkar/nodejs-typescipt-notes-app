import { AuthMethod } from "@interfaces/auth";
import config from "@config";

const googleConf = config.get("google");

export class GoogleAuth implements AuthMethod {
    authenticate(): void {
        throw new Error("Method not implemented.");
    }
}

export function getGoogleAuthURL() {
    const options: Partial<GoogleAuthOptions> = {
        redirect_uri: `${process.env.SERVER_HOST}${process.env.SERVER_REDIRECT_PATH}`,
        client_id: process.env.AUTH_CLIENT_ID,
        access_type: googleConf["access_type"],
        response_type: googleConf["response_type"],
        prompt: googleConf["prompt"],
        scope: googleConf["scopes"].join(" "),
    };

    return `${googleConf["root_url"]}?${new URLSearchParams(options)}`;
}

type GoogleAuthOptions = {
    redirect_uri: string;
    client_id: string;
    access_type: string;
    response_type: string;
    prompt: string;
    scope: string;
};
