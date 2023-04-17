/* eslint-disable kodekonveyor/no-literals */

import { dirname } from "path";
import url from "url";
import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import { createCommand } from "commander";

export const dirName = dirname(url.fileURLToPath(import.meta.url));

export const TYPESCRIPT_EXTENSION = ".ts";
export const JAVASCRIPT_EXTENSION = ".js";
export const COMMONJS_EXTENSION = ".cjs";
export const SLASH_D = "-d";
export const PATH_SEPARATOR = "/";
export const EMPTY_SPACE = "";

export const nullPromise = new Promise<number>((resolve) => {
  resolve(0);
});
export const defaultConfig: CDDConfiguration = {
  watch: false,
  distFiles: "dist/**/*.js",
  contracts: "contracts/**/*Contract.ts",
  jsDir: "dist",
  moduleResolution: "ES",
  debug: false,
};

export const argparser = createCommand("runContracts")
  .version("1.0.13")
  .description("check the contracts")
  .option("-w, --watch", "watch mode")
  .option(
    "-f, --distFiles [value]",
    "the files to be watched in watch mode (glob pattern)"
  )
  .option("-c, --contracts [value]", "the contracts (glob pattern)")
  .option("-j, --jsDir <value>", "the js directory used for computing import")
  .option("-m, --moduleResolution <value>", "module resolution strategy")
  .option(
    "-n, --numberofTests <value>",
    "expected number of tested contract clauses"
  )
  .option("-d, --debug", "debug");
