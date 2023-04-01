import { CDDConfiguration } from "../types/CDDConfiguration.js";
import { messageFormat } from "../util/messageFormat.js";

export function checkNumberOfTests(config:CDDConfiguration, tested: number): boolean {
    if (config.numberofTests !== undefined)
        if (tested !== Number(config.numberofTests)) {
            console.log(messageFormat("\n!!!!!\nexpected {1} tests, got {2}\n!!!!!\n", String(config.numberofTests), tested));
            return false
        }
    return true
}
