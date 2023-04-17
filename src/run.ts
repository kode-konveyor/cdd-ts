#!/usr/bin/env node

import { RunAllContractsService } from "./runner/RunAllContractsService.js";
import glob from "fast-glob";
import fs from "node:fs";
import url from "url";
import child_process from "child_process";
import { type CDDConfiguration } from "./types/CDDConfiguration.js";
import { CheckNumberOfTestsService } from "./runner/CheckNumberOfTestsService.js";
import { MergeConfigService } from "./runner/MergeConfigService.js";
import { MkArgvService } from "./runner/MkArgvService.js";
import {
  argparser,
  configFromFile,
  defaultConfig,
} from "./runner/Constants.js";
import { bound } from "./util/bound.js";
try {
  await import("@angular/compiler");
} catch {}
const myPath = url.fileURLToPath(import.meta.url);
const options: CDDConfiguration = argparser.parse(process.argv).opts();
const RUNNING_BECAUSE = "running contracts because";
const WATCHING = "watching";

const checkNumberOfTestsService =
  CheckNumberOfTestsService.prototype.checkNumberOfTests;

const mergeConfig =
  bound<MergeConfigService["mergeConfig"]>(MergeConfigService);

const mkArgv = MkArgvService.prototype.mkArgv;
const runAllContracts = bound<RunAllContractsService["runAllContracts"]>(
  RunAllContractsService
);

export const config = mergeConfig(defaultConfig, configFromFile, options);

if (config.watch) {
  if (config.debug) console.log(WATCHING, config.distFiles);
  glob(config.distFiles, {})
    // eslint-disable-next-line promise/prefer-await-to-then
    .then((files) => {
      for (const file of files) {
        fs.watch(file, () => {
          console.log(RUNNING_BECAUSE, file);
          child_process.fork(myPath, mkArgv(config));
        });
      }
    })
    // eslint-disable-next-line promise/prefer-await-to-then
    .catch((reason) => {
      console.error(reason);
    });
  const tested = await runAllContracts(config);
  if (!checkNumberOfTestsService(config, tested)) process.exit(-1);
} else {
  try {
    const tested = await runAllContracts(config);
    if (!checkNumberOfTestsService(config, tested)) process.exit(-1);
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
}
