import { SideEffectCheckerType } from "../../src/types/SideEffectChecker.js";
import { getSideEffectChecker } from "../SideEffectChecker/getSideEffectChecker.js";


export function getSideEffectCheckCase(): [string, SideEffectCheckerType] {
    return [
        "logs to console",
        getSideEffectChecker()
    ];
}
