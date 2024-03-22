process.env["NODE_CONFIG_DIR"] = __dirname;
import cfg from "config";
import path from "path";
import fs from "fs";

const CONFIG_PATH = "./";

class Config {
  constructor() {
    this.init();
  }

  private init() {
    const configFolderPath = CONFIG_PATH;
    const configFilePath = path.join(__dirname, configFolderPath, `${process.env.NODE_ENV}.json`);
    fs.readFileSync(configFilePath);
  }

  public get<Type = any>(prop: string): Type {
    return cfg.get(prop);
  }

  public has(prop: string): boolean {
    return cfg.has(prop);
  }
}

export default new Config();
