import { Response } from "express";
import { Exception } from "./apiErrors";
import { HttpStatus } from "@root/constants";
import { HasPropOf } from "@root/types";

type ErrorTypes = "appError" | "unhandledRejection" | "uncaughtException" | "unKnown";

class ErrorHandler {
    public async handleError(error: Error, type: ErrorTypes, res?: Response) {
        if (type === "appError" && this.isTrustedError(error)) {
            return res?.status(error.statusCode).json(this.formatErrorResponse(error));
        }
        console.error(error);

        if (type === "unKnown") {
            const errResponse = this.formatErrorResponse(error);
            res?.status(errResponse.statusCode).json(errResponse);
        }
        process.exit(1);
        /**
     * await logger.logError(err);
    await sendMailToAdminIfCritical();
    await saveInOpsQueueIfCritical();
    await determineIfOperationalError();
     */
    }

    public formatErrorResponse(error: Exception | Error): ErrorResp {
        if (error instanceof Exception) {
            return { ...error, message: error.message };
        }
        return {
            status: false,
            isOperational: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || (error.stack ? JSON.stringify(error.stack) : JSON.stringify(error)),
        };
    }

    public isTrustedError(error: Error): error is Exception {
        if (error instanceof Exception) {
            return error.isOperational;
        }
        return false;
    }
}
type ErrorResp = Omit<HasPropOf<Exception>, "name">;

export const errorHandler = new ErrorHandler();
