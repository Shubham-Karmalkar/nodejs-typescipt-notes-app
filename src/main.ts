import express, { Response, Request } from "express";
import { VoidFunc } from "./types";
import { Exception, postRouteMiddleware, preRouteMiddleware } from "./core";
import * as server from "./server";

const app = express();

//fallback error handler
postRouteMiddleware.add((error: any, req: Request, res: Response, next: VoidFunc) => {
  console.log("middleware error handler: ", error.stack);
  // res.json(error);
});

process.on("unhandledRejection", (reason) => {
  console.log("unhandledRejection Found: ", reason);
  throw new Exception("throwing from unhandledRejection");
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException Found: ", error);
});

server.init(app);
