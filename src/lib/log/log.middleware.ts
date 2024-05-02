import { Request, Response, NextFunction } from "express";
import { GenericObj } from "@root/types";
import { maskBody } from "./payloadMasker";
import { logger } from "./log.module";
import httpContext, { middleware } from "express-http-context";

export function logging(req: Request, res: Response, next: NextFunction) {
    contextAddition(req, res);
    logRequestResponse(req, res);
    next();
}

function logRequestResponse(req: Request, res: Response) {
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
}

function contextAddition(req: Request, res: Response) {
    httpContext.middleware(req, res, () => {
        httpContext.set("method", req.method);
        httpContext.set("path", req.path);
        httpContext.set("x-my-header", req.headers["x-my-header"]);
        httpContext.set("x-another-header", req.headers["x-another-header"]);
        httpContext.set("x-correlation-id", req.headers["x-correlation-id"]);
        httpContext.set("x-variant-id", req.headers["x-variant-id"]);
        httpContext.set("x-request-id", req.headers["x-request-id"]);
        httpContext.set("x-b3-traceid", req.headers["x-b3-traceid"]);
        httpContext.set("x-b3-spanid", req.headers["x-b3-spanid"]);
        httpContext.set("x-b3-parentspanid", req.headers["x-b3-parentspanid"]);
        httpContext.set("x-b3-sampled", req.headers["x-b3-sampled"]);
        httpContext.set("x-b3-flags", req.headers["x-b3-flags"]);
        httpContext.set("x-ot-span-context", req.headers["x-ot-span-context"]);
    });
}
