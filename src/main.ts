import express, { Response, Request } from "express";
import { VoidFunc } from "./types";
import "module-alias/register";
import { logRequestResponse } from "@lib/log/log.middleware";
import { Exception, postRouteMiddleware, preRouteMiddleware, errorHandler } from "./core";
import * as server from "./server";
import "@lib/log";

const app = express();
//https://app.diagrams.net/#G1tvL5CnkRjU4rHQpCH6hPuNPDN2mQ9n9r

preRouteMiddleware.add(express.json());

preRouteMiddleware.add(logRequestResponse);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to notes-app");
});

//fallback error handler
postRouteMiddleware.add(async (error: Error, req: Request, res: Response, next: VoidFunc) => {
  if (errorHandler.isTrustedError(error)) {
    return res.status(error.statusCode).json(error);
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
