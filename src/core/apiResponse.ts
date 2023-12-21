import { HttpStatus } from "../constants";
import { ValuesOf } from "../types";

export class ApiResponse {
  public status = true;
  public statusCode = 200;
  public body: any;
  constructor(body: any, statusCode?: ValuesOf<typeof HttpStatus>) {
    this.body = body;
    if (statusCode) this.statusCode = statusCode;
  }
}
