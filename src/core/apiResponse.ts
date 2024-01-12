import { HttpStatus } from "../constants";
import { ValuesOf } from "../types";

export class ApiResponse {
  public status = true;
  public statusCode = 200;
  public response: any;
  constructor(response: any, statusCode?: ValuesOf<typeof HttpStatus>) {
    this.response = response;
    if (statusCode) this.statusCode = statusCode;
  }
}
