import { readFileSync } from "fs";
import { type CDDConfiguration } from "../types/CDDConfiguration";

const CONFIG_FILE = "cdd-ts.json";
export const configFromFile: CDDConfiguration = JSON.parse(
  readFileSync(CONFIG_FILE).toString()
);
