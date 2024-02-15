import { HttpStatus } from "../../constants";
import { KeysOf, ValuesOf } from "../../types";

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
