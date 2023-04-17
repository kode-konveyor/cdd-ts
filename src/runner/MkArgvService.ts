import { type CDDConfiguration } from "../types/CDDConfiguration";
import { SLASH_D } from "./Constants.js";

export class MkArgvService {
  mkArgv(config: CDDConfiguration): Array<string> {
    const args: Array<string> = [];
    for (const field in config) {
      if (field === "debug") {
        if (config.debug) args.push(SLASH_D);
      } else if (field !== "watch") {
        args.push("--" + field);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        args.push(
          (config as unknown as Record<string, string>)[field] as string
        );
      }
    }
    if (config.debug) console.log(args);
    return args;
  }
}
