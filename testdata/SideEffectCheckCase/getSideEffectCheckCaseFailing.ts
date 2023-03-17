import { SideEffectCheckerType } from "../../src/types/SideEffectChecker";
import { getSideEffectCheckerFailing } from "../SideEffectChecker/getSideEffectCheckerFailing";


export function getSideEffectCheckCaseFailing(): [string, SideEffectCheckerType] {
    return [
        "failing sideEffectCheck",
        getSideEffectCheckerFailing()
    ];
}
