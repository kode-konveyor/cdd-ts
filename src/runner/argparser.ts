import { createCommand } from "commander";

export const argparser = createCommand("runContracts")
    .version("1.0.13")
    .description("check the contracts")
    .option("-w, --watch", "watch mode")
    .option("-f, --distFiles [value]", "the files to be watched in watch mode (glob pattern)")
    .option("-c, --contracts [value]", "the contracts (glob pattern)")
    .option("-j, --jsDir <value>", "the js directory used for computing import")
    .option("-m, --moduleResolution <value>", "module resolution strategy")
    .option("-n, --numberofTests <value>", "expected number of tested contract clauses")
    .option("-d, --debug", "debug");
