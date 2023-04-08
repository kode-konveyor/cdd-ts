import { CDDConfiguration } from "../types/CDDConfiguration";

export function mkargv(config: CDDConfiguration): Array<string> {
  const args: Array<string> = [];
  for (const field in config) {
    if (field === "debug") {
      if (config.debug) args.push("-d");
    } else if (field !== "watch") {
      args.push("--" + field);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      args.push((config as unknown as Record<string, string>)[field] as string);
    }
  }
  if (config.debug) console.log(args);
  return args;
}
