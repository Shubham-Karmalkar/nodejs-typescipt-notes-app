import { HttpStatus } from "@constants";
import { Exception, errorHandler } from "@core";
import type { NextFunction, Request, Response, Router } from "express";
import { userRoute } from "./user.routes";
require("express-group-routes");

const routes = (app: any): void => {
    // app.get("/", (req: Request, res: Response) => {
    //     res.send("Welcome to Notes App");
    // });

    app.group("/v1", (router: Router) => {
        router.use("/user", userRoute);
    });

    //should always be 1st postRouteMiddleWare
    app.use((req: Request, res: Response) => {
        throw new Exception("Route not Found", HttpStatus.NOT_FOUND);
    });

    //fallback error handler
    app.use(async (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (errorHandler.isTrustedError(error)) {
            return errorHandler.handleError(error, "appError", res);
        }
        errorHandler.handleError(error, "unKnown", res);
    });
};

export default routes;
