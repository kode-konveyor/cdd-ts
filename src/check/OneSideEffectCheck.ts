import { caseName } from "./CaseName.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { MethodType } from "../types/MethodType.js";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages.js";

export function oneSideEffectCheck<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS) {
    return (entry: [string, SideEffectCheckerType]) => {
        try {
            entry[1].check();
        } catch (error) {
            throw new Error(messageFormat(
                SIDE_EFFECT_CHECK_FAILURE_MESSAGE,
                caseName.call(this),
                entry[0],
                String(error)));
        }
        entry[1].tearDown();
    };
};
