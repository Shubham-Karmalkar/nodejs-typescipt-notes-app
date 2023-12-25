import express, { Response, Request } from "express";
import { VoidFunc } from "./types";
import { Exception, postRouteMiddleware, preRouteMiddleware, errorHandler } from "./core";
import * as server from "./server";
import { router } from "./apps/user/user.routes";

const app = express();

app.use("/user", router);

//fallback error handler
postRouteMiddleware.add(async (error: Error, req: Request, res: Response, next: VoidFunc) => {
  if (errorHandler.isTrustedError(error)) {
    return res.json(error);
  }
  errorHandler.handleError(error, "unKnown", res);
});

process.on("unhandledRejection", (error: Error) => {
  //as we know anything can be rejected so error above cannot be all the time instance of Error/ Exception
  errorHandler.handleError(error, "unhandledRejection");
});

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error, "uncaughtException");
});

server.init(app);
