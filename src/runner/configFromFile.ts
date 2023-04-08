import { readFileSync } from "fs";
import { CDDConfiguration } from "../types/CDDConfiguration";

export const configFromFile: CDDConfiguration = JSON.parse(
  readFileSync("cdd-ts.json").toString()
);
