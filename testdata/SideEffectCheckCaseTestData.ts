import { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { getSideEffectChecker, getSideEffectCheckerFailing } from "./SideEffectCheckerTestData.js";


export function getSideEffectCheckCase(): [string, SideEffectCheckerType] {
    return [
        "logs to console",
        getSideEffectChecker()
    ];
}


export function getSideEffectCheckCaseFailing(): [string, SideEffectCheckerType] {
    return [
        "failing sideEffectCheck",
        getSideEffectCheckerFailing()
    ];
}
