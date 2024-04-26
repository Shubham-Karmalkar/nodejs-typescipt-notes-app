import { HttpStatus } from "@constants";
import { KeysOf, ValuesOf } from "@root/types";

export class Exception extends Error {
    public readonly statusCode: ValuesOf<typeof HttpStatus>;
    public readonly status = false;
    public readonly message: string;
    public readonly isOperational = true;

    constructor(message: string, status?: ValuesOf<typeof HttpStatus>) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = status || HttpStatus.BAD_REQUEST;
        this.message = message;
    }
}

export function stackFilter(error: Error, ignoreStr: string) {
    if (!error.stack && !(error instanceof Error)) return;
    const arr = error.stack!.split("\n");
    error.stack = arr.filter((str) => !str.includes(ignoreStr)).join("\n");
}
