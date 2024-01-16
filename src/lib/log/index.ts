import winston, { format } from "winston";
const { combine, timestamp, json } = format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV !== "prod" ? "debug" : "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "notes-service" },
  transports: [new winston.transports.Console()],
});

console.log = function (...args) {
  logger.info(JSON.stringify(args));
};
console.info = function (...args) {
  logger.info(JSON.stringify(args));
};
console.error = function (...args) {
  logger.error(JSON.stringify(args));
};
console.debug = function (...args) {
  logger.debug(JSON.stringify(args));
};
console.warn = function (...args) {
  logger.warn(JSON.stringify(args));
};
