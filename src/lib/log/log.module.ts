import winston from "winston";
import { contextFormatter } from "./formatters";
const { combine, timestamp, json, errors } = winston.format;

export const logger = winston.createLogger({
    level: process.env.NODE_ENV !== "prod" ? "debug" : "info",
    format: combine(contextFormatter(), timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "notes-service" },
    transports: [new winston.transports.Console()],
});

console.log = function (...args) {
    logger.info(...args);
};
console.info = function (...args) {
    logger.info(...args);
};
console.error = function (...args) {
    logger.error(...args);
};
console.debug = function (...args) {
    logger.debug(...args);
};
console.warn = function (...args) {
    logger.warn(...args);
};
