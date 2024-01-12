import express, { Response, Request } from "express";
import { VoidFunc } from "./types";
import "module-alias/register";
import { Exception, postRouteMiddleware, preRouteMiddleware, errorHandler } from "./core";
import * as server from "./server";

const app = express();
//https://app.diagrams.net/#G1dEnqsf_RLpMTK0npPdRYcqaPZyruf1wi

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  console.log(req.path);
  res.send("Welcome to notes-app");
});

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
