import { relative, dirname } from "path";
import url from "url";
import { type CDDConfiguration } from "../types/CDDConfiguration.js";

const fileName = url.fileURLToPath(import.meta.url);
export const dirName = dirname(fileName);

const TYPESCRIPT_EXTENSION = ".ts";
const JAVASCRIPT_EXTENSION = ".js";
const COMMONJS_EXTENSION = ".cjs";
export function resolveModule(
  config: CDDConfiguration,
  contractFile: string
): string {
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
