import { HttpStatus } from "../constants";
import { Exception } from "../core/errors/apiErrors";
import fs from "fs";

export function getConfig(path?: string) {
  const ENV = process.env.NODE_ENV;
  if (!ENV) throw new Exception("NODE_ENV is not set", HttpStatus.INTERNAL_SERVER_ERROR);
  let config = JSON.parse(fs.readFileSync(ENV + ".json", "utf-8"));
  if (!path) {
    return config;
  }
  for (const property of path.split(".")) {
    config = config[property];
  }
  return config;
}

export const config = getConfig();
