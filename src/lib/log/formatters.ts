import winston from "winston";
import httpContext from "express-http-context";

export const contextFormatter = winston.format((info) => {
    const { _ns_name: ignored, ...context } = (httpContext.ns && httpContext.ns.active) || {};
    if (!info["__meta__"]) {
        info.context = context;
    }
    return info;
});
