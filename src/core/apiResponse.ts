import { HttpStatus } from "@constants";
import { ValuesOf } from "@root/types";

export class ApiResponse<Type = any> {
    public status = true;
    public statusCode = 200;
    public response: Type;
    constructor(response: Type, statusCode?: ValuesOf<typeof HttpStatus>) {
        this.response = response;
        if (statusCode) this.statusCode = statusCode;
    }
}

export function apiResponse<Type>(response: Type, statusCode?: ValuesOf<typeof HttpStatus>) {
    return new ApiResponse(response, statusCode);
}
