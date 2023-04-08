import { CDDConfiguration } from "../types/CDDConfiguration.js";
import { messageFormat } from "../util/messageFormat.js";

export function checkNumberOfTests(config:CDDConfiguration, tested: number): boolean {
    if (config.numberofTests !== undefined)
        if (tested !== Number(config.numberofTests)) {
            throw new Error(messageFormat("expected {1} tests, got {2}", String(config.numberofTests), tested));
        }
    return true
}
