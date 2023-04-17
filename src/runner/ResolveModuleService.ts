import { relative } from "path";
import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import {
  TYPESCRIPT_EXTENSION,
  JAVASCRIPT_EXTENSION,
  COMMONJS_EXTENSION,
} from "./Constants.js";
import { dirName } from "../util/dirName.js";

export class ResolveModuleService {
  resolveModule(config: CDDConfiguration, contractFile: string): string {
    if (config.moduleResolution === "ES") {
      return (
        relative(dirName, config.jsDir) +
        "/" +
        contractFile.replace(TYPESCRIPT_EXTENSION, JAVASCRIPT_EXTENSION)
      );
    }
    if (config.moduleResolution === "esbuild") {
      const path =
        relative(dirName, config.jsDir) +
        "/" +
        contractFile.replace(TYPESCRIPT_EXTENSION, COMMONJS_EXTENSION);
      return path;
    }
    return contractFile;
  }
}
