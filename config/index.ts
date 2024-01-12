import { HttpStatus } from "../src/constants";
import { Exception } from "../src/core/errors/apiErrors";
import fs from "fs";
import path from "path";
import { GenericObj } from "../src/types";

export function getConfig(configPath?: string) {
  const ENV = process.env.NODE_ENV;
  if (!ENV) throw new Exception("NODE_ENV is not set", HttpStatus.INTERNAL_SERVER_ERROR);

  const configFilePath = path.join(__dirname, ENV + ".json");

  let config = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));

  //resolving relative paths to absolute
  const paths: GenericObj<string> = config.paths;
  const newPaths: GenericObj<string> = {};
  for (const pathKey in paths) {
    newPaths[pathKey] = path.resolve(paths[pathKey]);
  }
  config.paths = newPaths;

  if (!configPath) {
    return config;
  }
  
  //path traversal as per requirement
  for (const property of configPath.split(".")) {
    config = config[property];
  }
  
  return config;
}

export const config = getConfig();
