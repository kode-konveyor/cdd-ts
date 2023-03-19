import { SideEffectCheckerType } from "../../src/types/SideEffectChecker.js";
import { getSideEffectCheckerFailing } from "../SideEffectChecker/getSideEffectCheckerFailing.js";


export function getSideEffectCheckCaseFailing(): [string, SideEffectCheckerType] {
    return [
        "failing sideEffectCheck",
        getSideEffectCheckerFailing()
    ];
}
