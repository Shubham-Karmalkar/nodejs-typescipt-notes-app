import { Response } from "express";
import { Exception } from "./apiErrors";

type ErrorTypes = "appError" | "unhandledRejection" | "uncaughtException" | "unKnown";

class ErrorHandler {
  public async handleError(error: Error, type: ErrorTypes, res?: Response): Promise<void> {
    console.error("inside handleError: ", error);
    /**
     * await logger.logError(err);
    await sendMailToAdminIfCritical();
    await saveInOpsQueueIfCritical();
    await determineIfOperationalError();
     */
  }

  public isTrustedError(error: Error) {
    if (error instanceof Exception) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
