import winston from "winston";
import { logger } from "@lib/log";

declare global {
  var logger: winston.Logger;

  namespace Express {
    export interface Request {
      start: number;
    }
  }
}

export {};
