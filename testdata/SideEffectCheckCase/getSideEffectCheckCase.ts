import { SideEffectCheckerType } from "../../src/types/SideEffectChecker";
import { getSideEffectChecker } from "../SideEffectChecker/getSideEffectChecker";


export function getSideEffectCheckCase(): [string, SideEffectCheckerType] {
    return [
        "logs to console",
        getSideEffectChecker()
    ];
}
