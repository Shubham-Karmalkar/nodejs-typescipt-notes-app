import { Request, Response, NextFunction } from "express";
import { GenericObj } from "@root/types";
import { maskBody } from "./payloadMasker";
import { logger } from ".";

export function logRequestResponse(req: Request, res: Response, next: NextFunction) {
  req.start = new Date().getTime();

  const oldResSend = res.send;
  const meta: GenericObj = {};
  const request: GenericObj = {};
  const response: GenericObj = {};

  (res.send as any) = (...args: any[]) => {
    const responseTime = new Date().getTime() - req.start;

    meta["protocol"] = `HTTP/${req.httpVersion}`;
    meta["requestUrl"] = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    meta["requestMethod"] = req.method;
    meta["remoteIp"] = req.ip;
    meta["requestSize"] = req.socket.bytesRead;
    meta["userAgent"] = req.get("User-Agent");
    meta["referrer"] = req.get("Referrer");
    meta["responseTime"] = responseTime + "ms";

    request["requestBody"] = JSON.stringify(maskBody(req.body));
    request["requestHeaders"] = req.headers;

    response["status"] = res.statusCode;
    response["responseBody"] = JSON.stringify(maskBody(JSON.parse(args[0])));
    response["responseHeaders"] = res.getHeaders();

    logger.log({
      level: "info",
      message: "request-logging",
      __meta__: meta,
      request: request,
      response: response,
    });

    oldResSend.apply(res, args as any);
  };
  next();
}
